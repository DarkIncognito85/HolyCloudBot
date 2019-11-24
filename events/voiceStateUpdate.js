const Discord = require("discord.js")
const config = require('../informations/config.json')
module.exports = (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  
  console.log(newUserChannel.id);
  console.log(config.scoreboard.liste)
}