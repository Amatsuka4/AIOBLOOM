import { describe, it, expect } from "vitest";
import { getApiConfigByApiKey } from "../utils/utils.js";

describe("getApiConfigByApiKey", () => {
  it("sk-で始まり51文字の場合にOpenAIの設定（旧形式ChatGPT APIキー）", () => {
    const apiKey = "sk-" + "a".repeat(48);
    expect(apiKey.length).toBe(51);
    expect(getApiConfigByApiKey(apiKey)).toEqual({
      baseURL: "https://api.openai.com/v1",
      modelEnvName: "CHATGPT_MODEL_NAME",
    });
  });

  it("sk-で始まり150〜164文字の場合にOpenAIの設定（新形式ChatGPT APIキー）", () => {
    const minKey = "sk-" + "a".repeat(147);
    const maxKey = "sk-" + "a".repeat(161);
    expect(minKey.length).toBe(150);
    expect(maxKey.length).toBe(164);
    const expected = {
      baseURL: "https://api.openai.com/v1",
      modelEnvName: "CHATGPT_MODEL_NAME",
    };
    expect(getApiConfigByApiKey(minKey)).toEqual(expected);
    expect(getApiConfigByApiKey(maxKey)).toEqual(expected);
  });

  it("sk-で始まり35文字の場合にDeepSeekの設定", () => {
    const apiKey = "sk-" + "a".repeat(32);
    expect(apiKey.length).toBe(35);
    expect(getApiConfigByApiKey(apiKey)).toEqual({
      baseURL: "https://api.deepseek.com",
      modelEnvName: "DEEPSEEK_MODEL_NAME",
    });
  });

  it("AIzaで始まる場合にGeminiの設定", () => {
    expect(getApiConfigByApiKey("AIzaSyExampleKey")).toEqual({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      modelEnvName: "GEMINI_MODEL_NAME",
    });
  });

  it("どの形式にも一致しない場合はthrow", () => {
    expect(() => getApiConfigByApiKey("")).toThrow();
    expect(() => getApiConfigByApiKey("sk-short")).toThrow();
    expect(() => getApiConfigByApiKey("sk-" + "a".repeat(50))).toThrow();
    expect(() => getApiConfigByApiKey("invalid-key")).toThrow();
  });
});
