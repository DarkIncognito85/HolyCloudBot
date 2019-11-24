const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let reason = args.slice(1).join(' ');
	var kick = message.guild.member(message.mentions.users.first())
	if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'utiliser cette commande !");
	if(message.mentions.users.size === 0){
		return message.channel.send("<:x:597060657279402004> Tu dois mentionner un utilisateur !")
	} else if (!reason) reason = 'raison non spécifiée'
	if(!kick.kickable) return message.channel.send("<:x:597060657279402004> Je ne peux pas kick cette personne !")

	var kickEmbed = new Discord.RichEmbed()
		.setDescription("Kick <:arrow_forward:597081457529323530>")
		.setColor("#bc0000")
		.addField("Utilisateur :", `${kick.user.username} `)
		.addField("Modérateur :", `<@${message.author.id}> `)
		.addField("Raison", reason);
	message.channel.send(kickEmbed).catch()
	kick.send(kickEmbed)

	kick.kick(reason).catch()
}


module.exports.help = {
	name:"kick",
	category: "mod"
}
