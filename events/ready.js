const ping = require('../functions/ping.js');
const Discord = require('discord.js');
const config = require('../informations/config.json');
const giveaways = require("discord-giveaways")

module.exports = async (client) => {
	
client.channels.get(config.status.channel).bulkDelete(3).catch(console.error);
const base = await client.channels.get(config.status.channel).send("<a:clock12:616194526108975105> Chargement des status en cours...");

setInterval(async function(){
	const guild = client.guilds.get(config.scoreboard.guild);
	let getAllOfflineMembers = guild.members.filter(m => m.presence.status == 'offline').size
	let getAllOnlineMembers = guild.members.filter(m => m.presence.status != 'offline').size
	let getAllMembers = guild.memberCount;
	try{
		client.channels.get(config.scoreboard.total).setName(`👥 Membres : ${getAllMembers} 👥`);
		client.channels.get(config.scoreboard.online).setName(`✅ Connectés : ${getAllOnlineMembers} ✅`);
		client.channels.get(config.scoreboard.offline).setName(`❌ Hors-Ligne : ${getAllOfflineMembers} ❌`);
	}catch(e){
		console.log(e)
	}
}, 6000)

	setInterval(async function() {
	try {
		time = new Date();
	utc = time.getTime() + (time.getTimezoneOffset() * 60000);
	nd = new Date(utc + (3600000*+2));

		let hour = nd.getHours()
		if(hour < 10) hour = "0" + hour
		let min = nd.getMinutes()
		if(min < 10) min = "0" + min
		time.toLocaleString("fr-FR", {timeZone: "Europe/Paris"})
	const status = new Discord.RichEmbed()
		status.setTitle('Status de HolyCloud.fr')
		status.setColor("RANDOM")
		status.setFooter('© 2019 - HolyCloud.fr - TOUS DROITS RÉSERVÉS.')
	ping('Web', '5.135.137.233');
		if (config.status.request.Web) {
		  status.addField(`Web :`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
	 } else {
	   status.addField(`Web :`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
	 }
	ping('Krypton', '5.135.137.233');
		  if (config.status.request.Krypton) {
			status.addField(`Krypton (MySQL):`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
	   } else {
		 status.addField(`Krypton (MySQL):`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
	   }
	ping('Alpha', '5.135.137.233');
	   if (config.status.request.Alpha) {
		status.addField(`Alpha (Game):`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
   		} else {
	 	  status.addField(`Alpha (Game):`, `<a:white_check_mark:616194526108975105> \`En ligne\``)
   		}
	ping('Neon', '5.135.137.233');
	   if (config.status.request.Neon) {
		 status.addField(`Neon (Game):`, `<a:white_check_mark:616194526108975105> \`En ligne\` \n \n*<:clock12:616194526108975105>Dernière actualisation : ${hour}:${min}*`)
	} else {
	  status.addField(`Neon (Game):`, `<a:white_check_mark:616194526108975105> \`En ligne\`\n \n<:clock12:616194526108975105> *Dernière actualisation : ${hour}:${min}*`)
	}
	base.edit(status)
}catch (e) {
	base.edit(`:x: Une erreur est survenue !`)
	console.error(e)
}
	}, 60000)


	    giveaways.launch(client, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        ignoreIfHasPermission: [],
        embedColor: "#bc0000",
        reaction: "🎉"
    });

client.user.setPresence({
    game: {
        name: "https://holycloud.fr/"
    }
});

}
