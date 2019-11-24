const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
	message.channel.send("<:bar_chart:597060757003436052> Ping du BOT ("+ ~~bot.ping + " ms)")
}


module.exports.help = {
	name:"ping",
	category: "ticket"
}
exports.conf = {
    aliases: []
};