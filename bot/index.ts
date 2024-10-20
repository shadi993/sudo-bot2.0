import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Bot is online!');
});

client.login(process.env.DISCORD_TOKEN);