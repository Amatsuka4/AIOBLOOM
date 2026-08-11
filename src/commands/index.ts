import { Collection } from "discord.js";
import type { Command } from "../types.js";
import { ping } from "./ping.js";
import { ask } from "./ask.js";

export const commands: Command[] = [ping, ask];
export const commandsByName = new Collection<string, Command>(commands.map((c) => [c.data.name, c]));
