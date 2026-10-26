export interface FreeLlmModel {
  id: string;
  name: string;
  context: string;
  maxOutput: string;
  modality: string;
  rateLimit: string;
}

export interface FreeLlmProvider {
  name: string;
  category: "provider_api" | "inference_provider";
  country: string;
  flag: string;
  url: string;
  baseUrl: string;
  description: string;
  footnoteRef: number | null;
  models: FreeLlmModel[];
}

export interface FreeLlmData {
  lastUpdated: string;
  providers: FreeLlmProvider[];
  footnotes: unknown[];
  glossary: unknown;
}
