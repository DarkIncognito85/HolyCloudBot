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
    var description = args.join(" ");
    let member = message.author;
    if(!description){
        message.channel.send(`:x: Veuillez mettre une description a votre bug !`);
        return;
    }
    con.query("INSERT INTO `bugs_reports`(`user_id`,`description`,`created_at`) VALUES (?,?,NOW())", [member.id, description], function(err, result){
        if(err)
        console.log(err)
        let embled = new Discord.RichEmbed()
        .setTitle('Nouveau bug')
        .setDescription("**Par** > *"+  member.tag +  "* \n **Description** > *" + description + "*")
        .setColor('#FF0000')
        .setFooter("HolyCloud", member.displayAvatarURL)
        .setTimestamp();
        var guild = message.guild
        var logs_channel = guild.channels.find(c => c.id === config.logs.channel)
    if(logs_channel){
        logs_channel.send(embled)
        message.channel.send(":white_check_mark: Merci d'avoir fait remonter ce bug. L'équipe s'en chargera dans les plus bref delais.")
    }
        message.delete()
        
    });
}

module.exports.help = {
    name: "bug",
    category: "utils"
}