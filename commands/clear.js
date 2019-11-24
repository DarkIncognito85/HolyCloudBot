const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:x:597060657279402004> Tu n'as pas la permission d'utiliser cette commande!");

    var args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("<:x:597060657279402004> Tu dois préciser le nombre de messages à supprimer")
    if(isNaN(args[0])) return message.channel.send("<:warning:597060630943367169> Ce n'est pas un nombre.")
    if(args[0] < 1 || args[0] > 100) return message.channel.send("<:warn:597060630943367169> Veuillez préciser un nombre entre 1 et 100")
    message.channel.bulkDelete(args[0])
    message.delete()

    var heure  = message.createdAt.toString().split(" ")

    var cleare = new Discord.RichEmbed()
        .setColor("#bc0000")
        .setDescription("<:arrow_forward:597074956882542602> Clear")
        .addField("Modérateur :", `<@${message.author.id}> `)
        .addField("Nombre de messages", args[0]);

    message.channel.send(cleare)

}

module.exports.help = {
    name:"clear",
    category: "mod"
}