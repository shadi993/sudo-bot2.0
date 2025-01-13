import { Client, GatewayIntentBits } from "discord.js";
import { handleGuildMemberAdd } from "./events/guildMemeberAdd";

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

export async function startBot() {
  bot.once("ready", () => {
    console.log(`Logged in as ${bot.user?.tag}!`);
  });

  bot.on("guildMemberAdd", handleGuildMemberAdd);

  await bot.login(process.env.DISCORD_BOT_TOKEN);
}

export default bot;