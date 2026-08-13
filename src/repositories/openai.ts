import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { getApiConfigByApiKey } from "../utils/utils.js";
import { z } from "zod";

type ChatMessage = { role: "system" | "user"; content: string };

class OpenAiRepository {
  #client: OpenAI;
  #model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set in .env");

    const { baseURL, modelEnvName } = getApiConfigByApiKey(apiKey);
    const model = process.env[modelEnvName];
    if (!model) throw new Error(`${modelEnvName} is not set in .env`);

    this.#client = new OpenAI({ apiKey, baseURL });
    this.#model = model;
  }

  async createChatCompletion(messages: ChatMessage[]) {
    const response = await this.#client.chat.completions.create({
      model: this.#model,
      messages,
    });
    return response.choices[0]?.message.content ?? "";
  }

  async createChatCompletionWithResponseFormat(
    messages: ChatMessage[],
    responseFormat: z.ZodSchema,
    formatName: string,
  ) {
    const response = await this.#client.chat.completions.create({
      model: this.#model,
      messages,
      response_format: zodResponseFormat(responseFormat, formatName),
    });
    return JSON.parse(response.choices[0]?.message.content ?? "{}");
  }
}

let instance: OpenAiRepository | undefined;

export function getOpenaiRepository(): OpenAiRepository {
  instance ??= new OpenAiRepository();
  return instance;
}
