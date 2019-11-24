const Discord = require("discord.js")
const config = require('../informations/config.json')
module.exports = (client, member) => {
    let main = client.channels.find(channel => channel.name.includes("discussion"))

    member.addRole(config.join.role)
    client.channels.get(config.join.channel).send(`**» Bienvenu(e) @${member.displayName} sur le Discord d'HolyCloud !**`)
    //client.channel.get("632335168593723414").send(`Nouveaux : @${member.displayName}`)
    let embled = new Discord.RichEmbed()
        .setColor("#32CD32")
        .setTitle("Nouvelle arrivée sur le discord")
        .setDescription("Bienvenue **"+  member.displayName +  "** \n  \n **Aide** > */help* \n **Support** > */new*\n **Site** > *https://holycloud.fr*")
        .setFooter("HolyCloud", member.displayAvatarURL)
        .setTimestamp();
        main.send(embled);
}