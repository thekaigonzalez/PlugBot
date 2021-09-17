const Discord = require('discord.js');
const Data = require("./api/PlugBotdata");
const Logger = require('./lib/Logger');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILDS]}); // Create client
const handle = require('./lib/handle')
const cfg = require('./cfg.json');
client.on("ready", () => {
    new Logger("plugb");
    console.log("hello, Pluggies.");
})

// PlugBot is fully open source under MIT license terms.
// Users must host this bot on their own to get full feature set.

client.on("messageCreate", msg => {
    
    if (msg.author.bot) return;
    let args = msg.content.slice(Data.PlugData.prefix.length).split(/ +/);
    let command = args.shift();

    try {
        require('./commands/' + msg.guild.id + "/" + command + ".js").basic(client, msg, args);
    } catch (e) {
        try {
            require("./commands/" + command + ".js").basic(client, msg, args);
        } catch (e) {
            console.log("no such command: " + e);
        }
    }
});

client.login(cfg.tok)