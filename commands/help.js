const Discord = require("discord.js");
const fs = require('fs')



module.exports.run = async (client, message, args) => {
    fs.readdir("./commands/", (err, files) => {
        if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")

    let help = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`${jsfile.length} commandes disponible !`)
        .setColor("#FF0033")
        .addField(`Modération`, `${client.commands.filter(cmd => cmd.help.category === 'mod').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`)
        .addField(`Utilitaire`, `${client.commands.filter(cmd => cmd.help.category === 'utils').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`)
        .addField(`Ticket`, `${client.commands.filter(cmd => cmd.help.category === 'ticket').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`)
        .addField(`Autre`, `${client.commands.filter(cmd => cmd.help.category === 'other').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`)
        .setFooter(`Aides - HolyCloud.fr`)
        .setTimestamp()
    message.channel.send(help)
    })
}

exports.conf = {
    aliases: ["h", "aide"]
};

module.exports.help = {
    name: "help",
    category: "utils"
};