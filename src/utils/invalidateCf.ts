import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

const cloudFront = new CloudFrontClient({ region: "ap-northeast-2" });

export async function invalidateCFPaths(paths: string[]) {
  await cloudFront.send(
    new CreateInvalidationCommand({
      // Set CloudFront distribution ID here
      DistributionId: "E2NMF6GCJEF37Y",
      InvalidationBatch: {
        CallerReference: `${Date.now()}`,
        Paths: {
          Quantity: paths.length,
          Items: paths,
        },
      },
    })
  );
}
