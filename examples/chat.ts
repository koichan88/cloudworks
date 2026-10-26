import { chatWithFallback } from "../src/free-llm-apis/index.ts";

const result = await chatWithFallback(
  [
    { provider: "groq", model: "llama-3.3-70b-versatile" },
    { provider: "openrouter", model: "openrouter/free" },
  ],
  [{ role: "user", content: "Say hello in Japanese." }],
);
console.log(`[${result.provider}/${result.model}] ${result.text}`);
