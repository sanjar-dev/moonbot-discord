// Constant Modules
const Discord = require('discord.js');
const gTTS = require('gtts');
const fs = require('fs');

const config = require('./config.json');

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
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) { return; }

    // Getting arguments and command
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Make a call by command name
    switch(command) {
        // +hello
        case ('hello'): {
            msg.reply('hello, nice to meet you!');
        } break;

        // +help
        case ('help'): {
            const embedHelp = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help: commands list')
                .addFields(
                    { name: '👋 +hello', value: "Say hi to a bot, and perhaps, it will say hi back! :)\n**Example:** *+hello*" },
                    { name: '🏷️ +clear', value: "To clear some messages that were flooded in the text channel!\n**Example:** *+clear 3 (will delete 3 messages from latest)*" },
                    { name: '🎙️ +say', value: "Turn your text into speech and play it in voice chat.\n**Example:** *+say en-us Hello, world! I am in your voice chat. (will say text starting from 'Hello, world...' in en-us language)*" },
                    { name: '🎙️ +say lang', value: "List all languages supported by text-to-speech.\n**Example:** *+say lang*" },
                    { name: '🎙️ +say stop', value: "Stop currently playing audio.\n**Example:** *+say stop*" }
                );
            msg.channel.send(embedHelp);
        } break;

        // +clear message_count
        case ('clear'): {
            if (!args.length) { return msg.channel.send('No messages count were specified - no messages were deleted!'); }
            if (isNaN(args[0])) { return msg.channel.send('Message count argument is not a number - no messages were deleted!'); }

            if (args[0] > 100) { return msg.channel.send('Can not delete more than 100 messages - no messages were deleted!'); }
            if (args[0] < 1) { return msg.channel.send('You have to delete at least 1 message - no messages were deleted!'); }

            const clear = async () => {
                await msg.channel.messages.fetch({ limit: args[0] }).then((msgFetched) => {
                    msg.channel.bulkDelete(msgFetched);
                    msg.channel.send(`${args[0]} messages were deleted by ${msg.author}.`);
                });
            }
            clear();
        } break;

        // +say language text
        case ('say'): {
            // if no arguments were passed
            if (!args.length) { return msg.reply('you have to pass at least 2 arguments!'); }

            // if other commands were passed
            switch(args[0]) {
                case ('stop'): { // stop
                    if (!msg.guild.voice.connection) { return; }
                    else { msg.guild.voice.connection.disconnect(); }
                    return;
                }
                case ('repeat'): { // repeat
                    if (msg.member.voice.channel) {
                        // connection and play last audio
                        const connection = await msg.member.voice.channel.join();
                        const dispatcher = connection.play(fs.createReadStream(`./audio/${msg.guild.id}.ogg`));
                        dispatcher.on('finish', () => {
                            connection.disconnect();
                        });
                    } else { msg.reply('join the channel first!'); }
                    return;
                }
                case ('lang'): {
                    msg.channel.send();
                }
            }

            // setting all arguments to constants
            const ttsLang = args[0].toString();
            const ttsText = args.splice(1).join(' ');

            // if not ready then return
            // if (ttsReady == false) { return; }
            if (serversReady[msg.guild.id] == false) { return; } // serversReady ready state

            // check if msg author is in voice channel
            if (msg.member.voice.channel) {
                // log text to speech text in the console
                console.log(`${msg.author.username}: ${ttsText}`);
                console.log(serversReady);

                // ready state false
                serversReady[msg.guild.id] = false;

                // Get the audio
                try {
                    const ttsObject = new gTTS(ttsText, ttsLang);
                    ttsObject.save(`./audio/${msg.guild.id}.ogg`, (err, data) => {
                        if (err) { return console.error(err); }
                    });
                } catch (err) {
                    console.error(err);
                    // ttsReady = true; return;
                    serversReady[msg.guild.id] = true; return;
                }

                // Send notification message
                msg.channel.send(`(${msg.author}, ${ttsLang}): ${ttsText}`);

                // Set connection to voice chat
                const connection = await msg.member.voice.channel.join();
                const dispatcher = connection.play(fs.createReadStream(`./audio/${msg.guild.id}.ogg`));;

                // Leave channel after finish
                dispatcher.on('finish', () => {
                    // ready state finish
                    serversReady[msg.guild.id] = true;
                    connection.disconnect();
                });
            // if user isn't connected to any vc
            } else { msg.reply('join the channel first!'); }
        } break;
    }
});

// Logging in
client.login(config.token);
