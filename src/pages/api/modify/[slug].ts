import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "experimental-edge";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { slug } = req.query;

  try {
    return res.json({ message: `${slug} config modified` });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error modifying");
  }
}
