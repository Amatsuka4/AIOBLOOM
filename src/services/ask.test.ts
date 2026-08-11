import { describe, expect, it, vi } from "vitest";
import { askOpenAI } from "./ask.js";

describe("askOpenAI", () => {
  it("モックしたrepositoryを注入して、実際のAPIを叩かずに検証できる", async () => {
    const createChatCompletion = vi.fn().mockResolvedValue("mocked answer");

    const result = await askOpenAI("hello", { createChatCompletion });

    expect(result).toBe("mocked answer");
    expect(createChatCompletion).toHaveBeenCalledWith([
      { role: "system", content: expect.any(String) },
      { role: "user", content: "hello" },
    ]);
  });
});
