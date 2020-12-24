import * as Discord from 'discord.js'

export async function discord_help(msg: Discord.Message) {
    const fieldHello = `
        Say hi to a bot, and perhaps, it will say hi back! :)
        **Example:** *+hello*`;
    const fieldClear = `
        To clear some messages that were flooded in the text channel!
        **Example:** *+clear 3 (will delete 3 messages from latest)*`;
    const fieldSay = `
        Turn your text into speech and play it in voice chat.
        **Example:** *+say en-us Hello, world! I am in your voice chat. (will say text starting from 'Hello, world...' in en-us language)*`;
    const fieldSayStop = `
        Stop currently playing speech.
        **Example:** *+say stop*`;

    const embedHelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Help: commands list')
        .addFields(
            { name: '👋 +hello', value: fieldHello },
            { name: '🏷️ +clear', value: fieldClear },
            { name: '🎙️ +say', value: fieldSay },
            { name: '🎙️ +say stop', value: fieldSayStop }
        );
    msg.channel.send(embedHelp);
}