
const Discord = module.require('discord.js');
const config = require('../informations/config.json');
module.exports.run = async (bot, message, args) => {
    var sugg = args.join(" ")
    if(!sugg){
        message.channel.send(":x:La suggestion ne peut pas être vide.")
        message.delete()
        return false
    }
    var author = message.author
    message.channel.send(":white_check_mark: Merci pour votre suggestion :writing_hand: \n **Une réponse vous sera donnée sous les meilleurs delais**")
    var guild = message.guild
    var sugg_channel = guild.channels.find(c => c.id === config.suggest.channel)
    if(sugg_channel){
        let embled = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Suggestion")
        .setDescription("**Par** > *"+  author.tag +  "* \n **Suggestion** > *" + sugg + "*")
        .setFooter("HolyCloud", author.displayAvatarURL)
        .setTimestamp();
        sugg_channel.send(embled).then(async embled => {
            await embled.react('✅');
            await embled.react('➖')
            await embled.react('❌');
            
        });
    
    }else{
        message.channel.send(":x:Le salon dedié aux suggestions n'est pas disponible.")
        message.delete()
        return false
    }
    message.delete()


    


}

module.exports.help = {
	name:"suggest",
	category: "other"
}
exports.conf = {
    aliases: []
};