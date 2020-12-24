import * as Discord from 'discord.js'

export async function discord_help(msg: Discord.Message) {
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
}