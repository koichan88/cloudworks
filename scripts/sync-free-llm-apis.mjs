// Pull the latest data.json from upstream (CC0) and regenerate dependent files.
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const base = "https://raw.githubusercontent.com/mnfst/awesome-free-llm-apis/main";
const res = await fetch(`${base}/data.json`);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
const text = await res.text();
JSON.parse(text);
writeFileSync("data/free-llm-apis.json", text);
execFileSync("node", ["scripts/gen-env-example.mjs"], { stdio: "inherit" });
console.log("Updated data/free-llm-apis.json. Re-fetch README manually if the doc needs refreshing.");
