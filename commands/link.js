
const Discord = module.require('discord.js');
const superagent = require('superagent')
const rp = require('request-promise')
var messageError = `:x: **Une erreur est survenue, merci d'attentre quelques minutes... :)**`
module.exports.run = async (bot, message, args, member) => {
    message.delete();
    var possible = ['code', 'reset']
    let role = message.guild.roles.find(r => r.name === "Client");
    var hasRank = message.member.roles.some(role => role.name === "Client")
    if(hasRank){
        message.channel.send(":x: **Érreur !** Votre rôle a déjà été mit.")
        return false
    }
    if(!args[0]){
        return message.channel.send(`:x: **Merci de préciser votre E-Mail chez HolyCloud !**`)
    }
    if(args[0] === "code"){
        /* Appel a l'API Interne HolyCloud */
        rp(`https://api.holycloud.fr/discord/actions.php?action=verifCode&code=${args[1]}`).then((html) => {
            const json = JSON.parse(html)
            if(json.success == 1){
                let member = message.member
                message.channel.send(':white_check_mark: **Bravo !** Vous avez reçu le rôle !')
                member.addRole(role).catch(console.error)
            }else if(json.success == 0){
                message.channel.send(':x: **Érreur !** ' + json.error)
            }
        }).catch(function(err){
            console.log(err)
            return message.channel.send(messageError)
        })        

    }else if(args[0] === "reset"){
        return message.channel.send(':x: **Érreur !** Cette fonctionnalité arrive bientôt !')

    }else if(args[0].includes("@")){
    
     /* Appel a l'API Interne HolyCloud */
     rp(`https://api.holycloud.fr/discord/actions.php?action=sendMail&email=${args[0]}&DiscordID=${member.id}`).then((html) => {
            const json = JSON.parse(html)
            if(json.success == 1){
                message.channel.send(':white_check_mark: **Bravo !** Un Email vous a été envoyé pour confirmer votre identité !')
            }else if(json.success == 0){
                message.channel.send(':x: **Érreur !** ' + json.error)
            }
        }).catch(function(err){
            console.log(err)
            return message.channel.send(messageError)
        })
    }else{
        /* Commande d'aide */
        let help = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Aide - Liaison Discord / HolyCloud`)
        .setColor("#FF0033")
        .addField(`/link <Email>`, `Commande pour demander le grade`)
        .addField(`/link code <Code>`, `Commande pour verifier le grade `)
        .addField(`/link reset <Email || Code>`, `Commande pour demander de retirer le grade`)
        .setFooter(`Aides - HolyCloud.fr `)
        .setTimestamp()
        return message.channel.send(help)
    }
}
module.exports.help = {
    name: "link",
    category: "utils"
}