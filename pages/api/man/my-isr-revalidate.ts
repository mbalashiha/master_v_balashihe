import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const body = req.body as {
    handlesToRevalidate: string[];
    secret: string;
  };
  // Check for secret to confirm this is a valid request
  if (!body || body.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (
    !Array.isArray(body.handlesToRevalidate) ||
    body.handlesToRevalidate.length <= 0
  ) {
    return res.status(500).send("Error revalidating: no handles to revalidate");
  }
  try {
    for (const handle of body.handlesToRevalidate) {
      // console.l//og('revalidating:', handle);
      await res.revalidate(`${handle}`);
    }
    return res.json({ revalidated: true });
  } catch (err: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating: " + err.message);
  }
}
