import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generatePrivacyPolicyHtml } from "../server/pages/privacyPolicy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "dist", "public");

// VERCEL_URL é definido automaticamente pela Vercel no build (sem protocolo)
// Exemplo: "seu-projeto.vercel.app"
const vercelUrl = process.env.VERCEL_URL;
const baseUrl = vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, "privacy-policy.html"), generatePrivacyPolicyHtml(baseUrl), "utf-8");

console.log("[generate-static-pages] privacy-policy.html gerada em", outDir, "baseUrl:", baseUrl);
