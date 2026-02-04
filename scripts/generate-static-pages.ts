import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generatePrivacyPolicyHtml } from "../server/pages/privacyPolicy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "dist", "public");

// Prioridade: VERCEL_PROD_URL (deploy de produção) > BASE_URL (env customizada) > localhost
// VERCEL_PROD_URL não tem protocolo, ex: "elisiacrm.com"
const baseUrl = process.env.VERCEL_PROD_URL
  ? `https://${process.env.VERCEL_PROD_URL}`
  : process.env.BASE_URL || "http://localhost:3000";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, "privacy-policy.html"), generatePrivacyPolicyHtml(baseUrl), "utf-8");

console.log("[generate-static-pages] privacy-policy.html gerada em", outDir, "baseUrl:", baseUrl);
