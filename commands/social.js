const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    message.delete()
	message.channel.send(`Voici la liste des réseaux sociaux ou nous sommes présent ! :logo: \n\n
    <:youtube:601539595766595584> **https://youtube.holycloud.fr ** -  *Des tutoriels  vidéos seront poster là bas !*\n\n
    <:twitter:589230974219321344> **https://twitter.holycloud.fr ** - *News, concours,... seront donner !*\n\n
    <:discord:601541199043624960> **https://discord.holycloud.fr ** - *Support technique, changelogs et annonce seront annoncer en tant réel !*`)
}


module.exports.help = {
	name:"social",
	category: "other"
}
exports.conf = {
    aliases: []
};