import { invalidateCFPaths } from "@/utils/invalidateCf";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { slug } = req.query;

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(`/test/${slug}`);

    if (process.env.NODE_ENV !== "development") {
      setTimeout(() => {
        invalidateCFPaths([`/*`]);
      }, 3000);
    }

    return res.json({ revalidated: true, message: `${slug} page revalidated` });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
