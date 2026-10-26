import { envKey, getProvider, openAiBaseUrl } from "./providers.ts";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  provider: string;
  model: string;
  messages: ChatMessage[];
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

/** Minimal OpenAI-compatible /chat/completions call using fetch. */
export async function chat(opts: ChatOptions): Promise<string> {
  const provider = getProvider(opts.provider);
  const apiKey = opts.apiKey ?? process.env[envKey(provider.name)];
  if (!apiKey) {
    throw new Error(`Set ${envKey(provider.name)} (get a key: ${provider.url})`);
  }
  const res = await fetch(`${openAiBaseUrl(provider)}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: opts.model,
      messages: opts.messages,
      temperature: opts.temperature,
      max_tokens: opts.maxTokens,
    }),
  });
  if (!res.ok) {
    throw new Error(`${provider.name} ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return json.choices[0]?.message.content ?? "";
}

/** Try providers in order; return the first success. */
export async function chatWithFallback(
  targets: { provider: string; model: string }[],
  messages: ChatMessage[],
): Promise<{ provider: string; model: string; text: string }> {
  const errors: string[] = [];
  for (const t of targets) {
    try {
      return { ...t, text: await chat({ ...t, messages }) };
    } catch (e) {
      errors.push(`${t.provider}: ${(e as Error).message}`);
    }
  }
  throw new Error(`All providers failed:\n${errors.join("\n")}`);
}
