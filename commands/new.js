const Discord = module.require('discord.js');
const rp = require('request-promise');
const mysql = require('mysql');
const config = require('../informations/config.json');
var con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.dbname
  });
var apikey = "CYD6m5feN3D949A3d7Dx35iTvmmSEL73FdBi6mx5";
module.exports.run = async (bot, message, args) => {
    var reason = args.join(" ");
    var endpoint = "https://api.holycloud.fr/discord/";
    if(!reason) reason = "Raison non spécifiée par le client";
    rp(endpoint + `ticketID.json`).then((html) => {
        var ParsedJSON = JSON.parse(html)
        var NextID = ParsedJSON.id +1
        var authorID = message.author.id
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT id FROM `tickets` WHERE `user_id` = "+ mysql.escape(authorID) + " AND `current` = "+ mysql.escape('open'), function(err,result){
                if (err) throw err;
                if(result.RowDataPacket != 0){
                     return message.channel.send(":x: Vous avez déjà un ticket d'ouvert. Vous ne pouvez pas en créer deux.");
                     
                }
            })
            var values = [NextID, authorID, reason];
            con.query("INSERT INTO `tickets`(`ticket_id`, `user_id`, `subject`, `created_at`) VALUES (?,?,?,NOW())", values, function (err, result) {
                if (err) throw err;
                var chan = message.guild.channels.find(c => c.name === `ticket-${authorID}`)
                if(chan) {
                    message.channel.send(":x: Impossible de récréer ce ticket.")
                    return;
                } else {
                    message.guild.createChannel(`ticket-${NextID}`, {
                        type: 'text',
                        permissionOverwrites: [{
                            id: message.guild.id,
                            deny: ['READ_MESSAGES']
                        }]
                    }).then(c => {
                        console.log("Un ticket créer !");
                        c.setParent(config.support.category)
                        let e = new Discord.RichEmbed()
                            .setColor("#0yrsz")
                            .setTitle("Ticket")
                            .setDescription("Ticket crée par " + message.author.username + "." + " \n la raison de ce ticket est " + reason + ".")
                            .setFooter("HolyCloud", message.author.displayAvatarURL)
                            .setTimestamp();
                        c.send(e);
                        c.setTopic(`Créateur du ticket : ${message.author.username}\n Raison : ${reason} \n \n /close : ferme le ticket \n /add : ajoute quelq'un au ticket \n /remove : retire quelq'un du ticket`);
                        var support = message.guild.roles.find(r => r.id === config.support.role)
                        c.overwritePermissions(support, {SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, READ_MESSAGES: true});
                        c.overwritePermissions(message.author, {SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, READ_MESSAGES: true, EMBED_LINKS:true, ATTACH_FILES:true})
                    })
                    rp(endpoint+ `updateTicket.php?key=` + apikey).then((html) => {
                        var ParsedJSON = JSON.parse(html)
                        if(ParsedJSON.success){
                            message.channel.send(`Votre ticket à bien été créé !`)
                        }else{
                        message.channel.send(`:x: Erreur interne`)
                        }
                        message.delete()
                        setTimeout(function(){
                            message.channel.bulkDelete(1).catch(console.error);
                        }, 10000)
                    })
                }  
        })
    })
}).catch(function(err){
    console.log(err)
})        
}


module.exports.help = {
    name: "new",
    category: "ticket"
}