const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    message.delete()
	message.channel.send(":earth_africa: » **Notre site est https://holycloud.fr**")
}


module.exports.help = {
	name:"site",
	category: "other"
}
exports.conf = {
    aliases: []
};