// Constant Modules
require('dotenv').config()
import * as Discord from 'discord.js';
import { discord_say } from './functions/say';

const client = new Discord.Client();

// State definings
// let ttsReady = true;
let serversReady = new Object();

// Client onready event
client.on('ready', () => {
    // Log out ready state
    console.log(client.user.username + " is online and ready to use.\n");
    // Set status
    client.user.setActivity('+help | +say');
});

// Message handling
client.on('message', async (msg) => {
    // Exit onmessage event if the message doesn't start with prefix or if it's a bot
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) { return; }

    // Getting arguments and command
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Make a call by command name
    switch(command) {

        case ('hello'): {
            msg.reply('hello, nice to meet you!');
        } break;

        case ('help'): {
            const embedHelp = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help: commands list')
                .addFields(
                    { name: '👋 +hello', value: "Say hi to a bot, and perhaps, it will say hi back! :)\n**Example:** *+hello*" },
                    { name: '🏷️ +clear', value: "To clear some messages that were flooded in the text channel!\n**Example:** *+clear 3 (will delete 3 messages from latest)*" },
                    { name: '🎙️ +say', value: "Turn your text into speech and play it in voice chat.\n**Example:** *+say en-us Hello, world! I am in your voice chat. (will say text starting from 'Hello, world...' in en-us language)*" },
                    // { name: '🎙️ +say lang', value: "List all languages supported by text-to-speech.\n**Example:** *+say lang*" },
                    { name: '🎙️ +say stop', value: "Stop currently playing audio.\n**Example:** *+say stop*" }
                );
            msg.channel.send(embedHelp);
        } break;

        case ('clear'): {
            if (!args.length) { return msg.channel.send('No messages count were specified - no messages were deleted!'); }
            if (typeof(args[0]) == 'number') { return msg.channel.send('Message count argument is not a number - no messages were deleted!'); }

            var msgs = parseInt(args[0]);
            if (msgs > 100) { return msg.channel.send('Can not delete more than 100 messages - no messages were deleted!'); }
            if (msgs < 1) { return msg.channel.send('You have to delete at least 1 message - no messages were deleted!'); }

            const clear = async () => {
                await msg.channel.messages.fetch({ limit: msgs }).then((msgFetched) => {
                    // msg.channel.bulkDelete(msgFetched);
                    msg.channel.send(`${args[0]} messages were deleted by ${msg.author}.`);
                });
            }
            clear();
        } break;

        case ('say'): {
            discord_say(msg, args, serversReady);
        } break;
    }
});

// Logging in
client.login(process.env.TOKEN);
