import { invalidateCFPaths } from "@/utils/invalidateCf";
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "experimental-edge";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    if (process.env.NODE_ENV !== "development") {
      await invalidateCFPaths(["/*"]);
    }

    return res.json({ invalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error invalidating");
  }
}
