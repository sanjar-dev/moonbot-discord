# Moon Speech
Moon Speech is a Discord bot built with Discord.js. It has multiple features including:
- Text to Speech
- "Letter" image creation

# Installing

## Requirements
- Node.js
- FFmpeg *for Discord.js audio in voice channels*

## Running locally
Clone repository locally. Create `.env` file with your bot token and prefered prefix values like this:

```ini
TOKEN=YOUR_TOKEN
PREFIX=YOUR_PREFIX
```

Then run these:

- `npm install` to install all node packages
- `npm build` to build source TypeScript files
- `npm start` to start the bot

Make sure that you've setuped `.env` file correctly, otherwise it won't work.