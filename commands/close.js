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
    var ChannelName = message.channel.name;
    if(ChannelName.startsWith("ticket-")) {
        const base = await message.channel.send("<:warning:597060630943367169> Êtes vous sur de vouloir supprimer votre ticket ? Vous ne pourrez plus retrouver les message. \n :white_check_mark: Oui \n <:x:597060657279402004> non")
        await base.react("✅")
        await base.react("❌")

        const collector = base.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on('collect', async(reaction) => {
            if (reaction.emoji.name === "✅") {
                var ticketID = ChannelName.split('-')[1]
                con.query("UPDATE `tickets` SET `current` = ?, `closed_at` = NOW() WHERE `ticket_id`= ?", ['closed', ticketID], function(err, result){
                    if (err) throw err;
                    console.log(result.affectedRows + " ticket(s) updated")
                })
                message.channel.delete()
                message.author.send("<:white_check_mark:597060666750402570> Votre ticket à bien été supprimé !")
            }

            if (reaction.emoji.name === "❌") {
                base.delete().catch()
                message.channel.send("<:x:597060657279402004> Action annulée. ")
            }
        });
    } else {
        message.channel.send("<:x:597060657279402004> Ce salon n'est pas un ticket !")
    }
}

module.exports.help = {
    name: "close",
    category: "ticket"
}