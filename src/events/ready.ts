import { Events } from "discord.js";
import type { BotEvent } from "../types.js";

export const ready: BotEvent<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
  },
};
