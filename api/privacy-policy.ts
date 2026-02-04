import { generatePrivacyPolicyHtml } from "../server/pages/privacyPolicy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  const baseUrl = `${req.headers.host ? "https://" + req.headers.host : "http://localhost:3000"}`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(generatePrivacyPolicyHtml(baseUrl));
}
