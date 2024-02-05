import type { NextApiRequest, NextApiResponse } from "next";

// const cloudFront = new CloudFrontClient({});

// async function invalidateCFPaths(paths: string[]) {
//   await cloudFront.send(
//     new CreateInvalidationCommand({
//       // Set CloudFront distribution ID here
//       DistributionId: "E2NMF6GCJEF37Y",
//       InvalidationBatch: {
//         CallerReference: `${Date.now()}`,
//         Paths: {
//           Quantity: paths.length,
//           Items: paths,
//         },
//       },
//     })
//   );
// }

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

    // if (process.env.NODE_ENV !== "development") {
    //   await invalidateCFPaths([`/*`]);
    // }

    return res.json({ revalidated: true, message: `${slug} page revalidated` });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
