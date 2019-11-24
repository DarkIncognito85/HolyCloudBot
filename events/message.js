const Discord = require('discord.js');
const prefix = '/';
const config = require('../informations/config.json');

module.exports = (bot, message) => {
    console.log(message.channel.id === config.channels.review);
    if (message.author.bot || message.channel.type === 'dm')return
    if (!message.channel.permissionsFor(bot.user).has('SEND_MESSAGES'))return
    if (!message.content.startsWith(prefix) && message.channel.id !== config.channels.review) { return; }
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commande = args.shift();
    if(!message.member.hasPermission('ADMINISTRATOR')){
        if(commande == 'new'){
            if(message.channel.id !== config.channels.ticket){
                message.delete();
                message.channel.send(`:x: Merci d'utiliser cette commande dans <#${config.channels.ticket}> !`)
                return false;
            }
        }
        if(commande !== 'new'){
            if(message.channel.id !== config.channels.command){
                message.delete();
                message.channel.send(`:x: Merci d'utiliser cette commande dans <#${config.channels.command}> !`)
                return false;
            }
        }
        if(commande === 'close'){
            if(!message.channel.name.startsWith("ticket-")){
                message.delete();
                message.channel.send(`:x: Merci d'utiliser cette commande selement pour un ticket !`)
                return false;
            }
        }
        if(message.channel.id === config.channels.review){
            message.delete();
            let embled = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("Avis")
            .setDescription("**Par** > *"+  author.tag +  "* \n **Son avis sur HolyCloud.fr** > *" + message + "*")
            .setFooter("HolyCloud", author.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embled)
        }
    }
    let cmd = bot.commands.get(commande);

    if (!cmd)return
    cmd.run(bot, message, args);
};