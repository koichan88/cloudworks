import { chatWithFallback } from "../src/free-llm-apis/index.ts";

// Keyless providers first, then keyed ones (set the key in .env to enable them).
const result = await chatWithFallback(
  [
    { provider: "ovhcloud-ai-endpoints", model: "gpt-oss-120b" },
    { provider: "llm7-io", model: "gpt-oss:20b" },
    { provider: "groq", model: "openai/gpt-oss-120b" },
    { provider: "openrouter", model: "openrouter/free" },
  ],
  [{ role: "user", content: "Say hello in Japanese." }],
);
console.log(`[${result.provider}/${result.model}] ${result.text}`);
