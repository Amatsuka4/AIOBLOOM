import type { BotEvent } from "../types.js";
import { ready } from "./ready.js";
import { interactionCreate } from "./interactionCreate.js";

export const events: BotEvent<any>[] = [ready, interactionCreate];
