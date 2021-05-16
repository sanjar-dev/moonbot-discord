import * as Discord from 'discord.js'

export async function discord_help(msg: Discord.Message) {
    const helpCommand = [
        '+hello',
        '+clear',
        '+say',
        '+say stop',
        '+letter'
    ]
    const helpDescription = [
        'Say hi to a bot, and perhaps, it will say hi back! :)\n__Example__: `+hello`',
        'To clear some messages that were flooded in the text channel!\n__Example__: `+clear 3` (will delete 3 messages from latest)*',
        'Turn your text into speech and play it in voice chat.\n__Example__: `+say en-us Hello, world! I am in your voice chat.` (will say text starting from \'Hello, world...\' in en-us language)',
        'Stop currently playing speech.\n__Example__: `+say stop`',
        'Send a letter with the message inside! Oh my...\n__Example__: `+letter @Moon Speech#1146 hello!`'
    ]
    const embedHelp = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('Help: commands list');
    for (let i = 0; i < helpCommand.length; i++) {
        if (helpDescription[i] != undefined) { embedHelp.addField(helpCommand[i], helpDescription[i]); }
    }
    msg.channel.send(embedHelp);
}