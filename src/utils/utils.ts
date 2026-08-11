export function getApiConfigByApiKey(apiKey: string): {
  baseURL: string;
  modelEnvName: string;
} {
  if (apiKey.startsWith("sk-") && apiKey.length === 51) {
    // Legacy ChatGPT API Key
    return {
      baseURL: "https://api.openai.com/v1",
      modelEnvName: "CHATGPT_MODEL_NAME",
    };
  }
  if (
    apiKey.startsWith("sk-") &&
    apiKey.length >= 150 &&
    apiKey.length <= 164
  ) {
    // Modern ChatGPT API Key
    return {
      baseURL: "https://api.openai.com/v1",
      modelEnvName: "CHATGPT_MODEL_NAME",
    };
  }
  if (apiKey.startsWith("sk-") && apiKey.length === 35) {
    // DeepSeek API Key
    return {
      baseURL: "https://api.deepseek.com",
      modelEnvName: "DEEPSEEK_MODEL_NAME",
    };
  }
  if (apiKey.startsWith("AIza")) {
    // Google Gemini API Key
    return {
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      modelEnvName: "GEMINI_MODEL_NAME",
    };
  }
  throw new Error("Unknown API key format: OPENAI_API_KEY");
}
