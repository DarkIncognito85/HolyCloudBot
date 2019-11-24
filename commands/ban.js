const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
	let reason = args.slice(1).join(' ');
	var ban = message.guild.member(message.mentions.users.first())
	if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'utiliser cette commande !");
	if(message.mentions.users.size === 0){
		return message.channel.send("<:x:597060657279402004> Tu dois mentionner un utilisateur !")
	} else if(!ban) {
		return message.channel.send("<:x:597060657279402004> Je ne sais pas trouve pas l'utilistateur")
	} else if (!reason) reason = 'raison non spécifiée'
	if(!ban.bannable) return message.channel.send("<:x:597060657279402004> Je ne peux pas ban cette personne !")


	var banEmbed = new Discord.RichEmbed()
		.setDescription("Ban <a:arrow_forward: 597078811615428608>")
		.setColor("#bc0000")
		.addField("Utilisateur :", `${ban} `)
		.addField("Modérateur :", `<@${message.author.id}> `)
		.addField("Raison", reason);
	message.channel.send(banEmbed).catch()
	ban.send(banEmbed)

	ban.ban(reason).catch()
}


module.exports.help = {
	name:"ban",
	category: "mod"
}