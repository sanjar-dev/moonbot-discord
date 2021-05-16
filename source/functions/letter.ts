import * as Discord from "discord.js"
import { createCanvas, loadImage } from "canvas";

export async function discord_letter(msg:Discord.Message, args:string[]) {
    if (!args.length) { return msg.reply('you have to pass at least 2 arguments!'); }

    // const letterName = args[0];
    const letterName = msg.mentions.users.first();
    const letterText = args.splice(1).join(' ');

    const canvas = createCanvas(1280, 611);
    const context = canvas.getContext("2d");

    const letterBottom = "./images/letter_bottom.png";
    const letterFront = "./images/letter_front.png";

    await loadImage(letterBottom).then(img => {
        context.drawImage(img, 0, 0);
    });

    // Recipient
    context.font = "56px Caveat";
    context.rotate(-4 * Math.PI / 180);
    context.translate(-25, 40);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#A05C73";
    context.fillText("@" + letterName.username, 1280 / 2, 611 / 2.5);

    // Message
    context.font = "32px Caveat";
    context.fillText(letterText, 1280 / 2, 611 / 1.4, 580);

    context.setTransform(1, 0, 0, 1, 0, 0);
    await loadImage(letterFront).then(img => {
        context.drawImage(img, 0, 0);
    });

    // // Export image
    // const buffer = canvas.toBuffer('image/png');
    // writeFileSync('./images/' + msg.guild.id + '.png', buffer);

    // // Send image to the channel
    // msg.channel.send(buffer);

    const bufferAttach = new Discord.MessageAttachment(canvas.toBuffer(), msg.guild.id + '.png');
    msg.channel.send(`${msg.author} ${letterName}`, bufferAttach);
    console.log("got to this point wtf");
}