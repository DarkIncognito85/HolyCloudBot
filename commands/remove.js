const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
	var membre = message.guild.member(message.mentions.users.first())
	if(!message.channel.name.startsWith("ticket-")) return message.channel.send("<:x:597060657279402004> Ce salon n'est pas un ticket !")
	if(!membre) return message.channel.send("<:x:597060657279402004> Tu dois mentionner quelqu'un à retirer ticket !")
	if(membre.id === message.author.id) return message.channel.send("<:x:597060657279402004> Tu ne peux pas te retirer de ton propre ticket !")
	message.channel.overwritePermissions(membre, {SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false, READ_MESSAGES: false})
	message.delete()
	message.channel.send(`${membre} a bien été retiré du ticket ${message.channel} par ${message.author.username}.`)
}

module.exports.help = {
	name: "remove",
	category: "ticket"
}