const Discord = module.require('discord.js');
const config = require('../informations/config.json');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.dbname
  });

module.exports.run = async (bot, message, args) => {
    let global = []; 
    
    let embled = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Vos tickets")
    con.query("SELECT ticket_id, subject, current,closed_at, created_at FROM `tickets` WHERE `user_id`= ?", [message.author.id], function(err, rows, fields){
        if(rows.length == 0){
            embled.addField('Pas de ticket a afficher.', `Pour créer un ticket /new`)
        }
          var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
          resultArray.forEach(function(v){
            var id = v.ticket_id
            var current = v.current
            var date = v.closed_at != undefined ? v.closed_at : v.created_at
            var text = current == 'open' ? 'Ouvert' : 'Fermé';
            var imote = current == 'open' ? ':white_check_mark:' : ':x:';
            let time = new Date(date);
            var subject = v.subject
            time.toLocaleString("fr-FR", {timeZone: "Europe/Paris"})
            embled.addField("#" + id + ' - '+ subject, imote + '`' + text + " Le " + time.getUTCFullYear()+"/"+time.getUTCMonth()+"/"+time.getUTCDate()+" à "+time.getUTCHours()+"h"+ time.getUTCMinutes() + "`")
             })

             embled.setTimestamp();
            message.channel.send(embled)
    })
           
            
}

module.exports.help = {
    name: "tickets",
    category: "ticket"
}