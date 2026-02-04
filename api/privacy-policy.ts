import { privacyPolicyHtml } from "../server/pages/privacyPolicy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(_req: any, res: any) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(privacyPolicyHtml);
}
