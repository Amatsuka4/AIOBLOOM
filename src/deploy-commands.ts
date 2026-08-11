import "dotenv/config";
import { REST, Routes } from "discord.js";
import { commands } from "./commands/index.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token) throw new Error("DISCORD_TOKEN is not set in .env");
if (!clientId) throw new Error("DISCORD_CLIENT_ID is not set in .env");
if (!guildId) throw new Error("DISCORD_GUILD_ID is not set in .env");

const body = commands.map((c) => c.data.toJSON());
const rest = new REST().setToken(token);

await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
console.log(`Registered ${body.length} guild command(s).`);
