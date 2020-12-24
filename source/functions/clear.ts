import * as Discord from "discord.js";

export async function discord_clear(msg: Discord.Message, args: string[]) {
    const txtchannel = msg.channel as Discord.TextChannel;

    if (!args.length) { return txtchannel.send('No messages count were specified - no messages were deleted!'); }
    if (typeof(args[0]) == 'number') { return txtchannel.send('Message count argument is not a number - no messages were deleted!'); }

    var msgs = parseInt(args[0]);
    if (msgs > 100) { return txtchannel.send('Can not delete more than 100 messages - no messages were deleted!'); }
    if (msgs < 1) { return txtchannel.send('You have to delete at least 1 message - no messages were deleted!'); }

    const clear = async () => {
        await txtchannel.messages.fetch({ limit: msgs }).then((msgFetched) => {
            txtchannel.bulkDelete(msgFetched);
            txtchannel.send(`${args[0]} messages were deleted by ${msg.author}.`);
        });
    }

    clear();
}