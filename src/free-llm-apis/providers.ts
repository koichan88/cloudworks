import data from "../../data/free-llm-apis.json" with { type: "json" };
import type { FreeLlmData, FreeLlmProvider } from "./types.ts";

const catalog = data as unknown as FreeLlmData;

export const lastUpdated = catalog.lastUpdated;
export const providers: FreeLlmProvider[] = catalog.providers;

export function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function envKey(name: string): string {
  return `${slug(name).replace(/-/g, "_").toUpperCase()}_API_KEY`;
}

/**
 * OpenAI-compatible chat base URLs where the catalog's baseUrl is a native
 * (non-OpenAI) endpoint. Taken from each vendor's compatibility docs; verify
 * before relying on them. Cloudflare needs CLOUDFLARE_ACCOUNT_ID.
 */
const openAiCompatOverride: Record<string, string> = {
  "google-gemini": "https://generativelanguage.googleapis.com/v1beta/openai",
  cohere: "https://api.cohere.ai/compatibility/v1",
  "ollama-cloud": "https://ollama.com/v1",
  "cloudflare-workers-ai":
    "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1",
};

export function openAiBaseUrl(p: FreeLlmProvider): string {
  const url = openAiCompatOverride[slug(p.name)] ?? p.baseUrl;
  return url.replace(
    "{account_id}",
    process.env.CLOUDFLARE_ACCOUNT_ID ?? "{account_id}",
  );
}

/** Providers whose free tier works without an API key (per the catalog notes). */
export const keylessProviders = new Set([
  "ovhcloud-ai-endpoints",
  "llm7-io",
  "kilo-code",
]);

export function getProvider(nameOrSlug: string): FreeLlmProvider {
  const s = slug(nameOrSlug);
  const p = providers.find((x) => slug(x.name) === s);
  if (!p) {
    throw new Error(
      `Unknown provider "${nameOrSlug}". Available: ${providers.map((x) => slug(x.name)).join(", ")}`,
    );
  }
  return p;
}
