require('dotenv').config();
import * as Discord from 'discord.js'
import { registerFont } from 'canvas'

import { discord_say } from './functions/say'
import { discord_clear } from './functions/clear'
import { discord_help } from './functions/help'
import { discord_letter } from './functions/letter'

const client = new Discord.Client();

let serversReady = new Object();

client.on('ready', () => {
    console.log(client.user.username + " is online and ready to use.\n");
    client.user.setActivity('+help');
    registerFont('./fonts/caveat.ttf', { family: "Caveat" });
});

client.on('message', async (msg) => {
    // Exit onmessage event if the message doesn't start with prefix or if it's a bot
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) { return; }

    // Getting arguments and command
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Make a call by command name
    switch(command) {
        case ('hello'):
            msg.reply('hello, nice to meet you!');
            break;
        case ('help'):
            discord_help(msg);
            break;
        case ('clear'):
            discord_clear(msg, args);
            break;
        case ('say'):
            discord_say(msg, args, serversReady);
            break;
        case ('letter'):
            discord_letter(msg, args);
            break;
    }
});

// Logging in
client.login(process.env.TOKEN);