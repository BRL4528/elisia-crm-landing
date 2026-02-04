import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { privacyPolicyHtml } from "../server/pages/privacyPolicy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "dist", "public");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, "privacy-policy.html"), privacyPolicyHtml, "utf-8");

console.log("[generate-static-pages] privacy-policy.html gerada em", outDir);
