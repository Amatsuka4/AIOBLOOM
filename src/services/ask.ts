import { getOpenaiRepository } from "../repositories/openai.js";

interface OpenaiRepository {
  createChatCompletion(
    messages: { role: "system" | "user"; content: string }[],
  ): Promise<string>;
}

export function askOpenAI(
  question: string,
  repo: OpenaiRepository = getOpenaiRepository(),
) {
  return repo.createChatCompletion([
    {
      role: "system",
      content:
        "あなたはDiscord Botです。答えは日本語で返してください。また、返答自体は簡潔にしてください。",
    },
    { role: "user", content: question },
  ]);
}
