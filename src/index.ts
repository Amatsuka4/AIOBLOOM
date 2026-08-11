import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { events } from "./events/index.js";

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error("DISCORD_TOKEN is not set in .env");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

for (const event of events) {
  if (event.once) {
    client.once(event.name, event.execute);
  } else {
    client.on(event.name, event.execute);
  }
}

client.login(token);
