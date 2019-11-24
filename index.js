const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const config = require('./informations/config.json');
const mysql = require('mysql');
bot.login(config.bot.token);

bot.commands = new Discord.Collection();
var con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.dbname
  });
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Je ne trouve pas de commandes");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} chargé`);
        bot.commands.set(props.help.name, props);
        
    });
});

fs.readdir('./events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./events/${f}`);
        let event = f.split('.')[0];
        bot.on(event, events.bind(null, bot));
    });
});


