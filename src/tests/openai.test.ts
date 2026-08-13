import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("openai", () => ({
  default: vi.fn().mockImplementation(function () {
    return { chat: { completions: { create } } };
  }),
}));

describe("createChatCompletionWithResponseFormat", () => {
  beforeEach(() => {
    vi.resetModules();
    create.mockReset();
    process.env.OPENAI_API_KEY = "sk-" + "a".repeat(48);
    process.env.CHATGPT_MODEL_NAME = "gpt-4o-mini";
  });

  afterEach(() => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.CHATGPT_MODEL_NAME;
  });

  it("Zodスキーマからresponse_formatを組み立て、返答をJSONとしてパースして返す", async () => {
    create.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify({ answer: "42" }) } }],
    });

    const { getOpenaiRepository } = await import("../repositories/openai.js");
    const repo = getOpenaiRepository();

    const result = await repo.createChatCompletionWithResponseFormat(
      [{ role: "user", content: "question" }],
      z.object({ answer: z.string() }),
      "answer_schema",
    );

    expect(result).toEqual({ answer: "42" });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gpt-4o-mini",
        response_format: expect.objectContaining({
          type: "json_schema",
          json_schema: expect.objectContaining({ name: "answer_schema" }),
        }),
      }),
    );
  });
});
