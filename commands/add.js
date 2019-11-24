const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
	var channel = message.mentions.channels.first()
	var membre = message.guild.member(message.mentions.users.first())
	if(!channel) return message.channel.send("<:off_false:597060657279402004> Tu dois mentionner un salon !")
	if(!channel.name.startsWith("ticket-")) return message.channel.send("<:off_false:597060657279402004> Ce salon n'est pas un ticket !")
	if(!membre) return message.channel.send("<:off_false:597060657279402004> Tu dois mentionner quelqu'un à ajouter au ticket !")
	channel.overwritePermissions(membre, {SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, READ_MESSAGES: true})
	message.delete()
	message.channel.send(`${membre} a bien été ajouté au ticket ${channel} par ${message.author.username}.`)
}

module.exports.help = {
	name: "add",
	category: "ticket"
}