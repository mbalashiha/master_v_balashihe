import getNextjsRevalidateUrls from "@framework/getNextjsRevalidateUrls";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const body = req.body as {
    revalidateUuids: string[];
    secret: string;
  };
  // Check for secret to confirm this is a valid request
  if (!body || body.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (
    !Array.isArray(body.revalidateUuids) ||
    body.revalidateUuids.length <= 0
  ) {
    return res.status(500).send("Error revalidating: no handles to revalidate");
  }
  try {
    const handles = await getNextjsRevalidateUrls({
      uuids: body.revalidateUuids,
      secret: process.env.MY_SECRET_TOKEN,
    });
    const revalidated = [];
    for (const handle of handles) {
      const revUrl = handle.startsWith("/") ? handle : `/${handle}`;
      await res.revalidate(revUrl);
      revalidated.push(revUrl);
    }
    return res.json({
      revalidated,
    });
  } catch (err: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating: " + err.message);
  }
}
