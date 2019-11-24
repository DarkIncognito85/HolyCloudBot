const Discord = require('discord.js');
const config = require('../informations/config.json')
const Ping = require('ping-lite');
const fs = require('fs');

function ping(name, ip) {
	let request = new Ping(`${ip}`);
  request.send(function(err, ms) {
    if (request._host === "undefined") {
      console.log(ms);
    } else {
      config.status.request[name] = ms;
			fs.writeFile("./informations/config.json", JSON.stringify(config, null, 4), err => { if(err) console.log(err) });
	   }
	});
}

module.exports = ping;
