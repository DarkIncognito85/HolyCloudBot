const Discord = require('discord.js');
const fs = require('fs')
const ms = require("ms")
const giveaways = require("discord-giveaways")

module.exports.run = async (client, message, args) => {
    var hasRole = message.member.hasPermission('ADMINISTRATOR')

    if(!hasRole){
        message.channel.send(`:x: Vous ne possédez pas le grade requis !`)
        message.delete()
        return
    }
    if(!args[0]){
        return message.channel.send(`:x: Merci de mettre un **temps** !`)
    }else if(!args[1]){
        return message.channel.send(`:x: Merci de mettre le nombre de **gagnant** !`)
    }else if(isNaN(args[1])){
        return message.channel.send(`:x: Merci de mettre le nombre de **gagnant** !`)
    }else if(!args[2]){
        return message.channel.send(`:x: Merci de mettre un **prix** !`)
    }
    giveaways.start(message.channel, {
        time: ms(args[0]),
        prize: args.slice(2).join(" "),
        winnersCount: parseInt(args[1]),
        messages: {
            giveaway: "🎉 **GIVEAWAY** 🎉",
            giveawayEnded: "🎉 **GIVEAWAY FINI** 🎉",
            timeRemaining: "Temps restant **{duration}** !",
            inviteToParticipate: "Clique sur 🎉 pour participer !",
            winMessage: ":clap: Bravo, {winners} ! Tu as gagné **{prize}** !",
            embedFooter: "Giveaways",
            noWinner: "Fin du giveaway, aucun gagnant choisis.",
            winners: "Gagant(s)",
            endedAt: "Fini",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours"
            }
        }
    });
    

}

exports.conf = {
    aliases: ["event"]
};

module.exports.help = {
    name: "giveaway",
    category: "mod"
};