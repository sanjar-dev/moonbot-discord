import * as Discord from "discord.js";
import * as fs from 'fs';
const gTTS = require('gtts');

export async function discord_say(msg: Discord.Message, args: string[], serversReady: Object) {
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
        const dispatcher = connection.play(fs.createReadStream(`./audio/${msg.guild.id}.ogg`));

        // Leave channel after finish
        dispatcher.on('finish', () => {
            // ready state finish
            serversReady[msg.guild.id] = true;
            connection.disconnect();
        });
    } else { msg.reply('join the channel first!'); }

    return serversReady;
}