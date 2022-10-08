import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { searchPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query?.id;
    if (id) {
      const videosQuery = searchPostsQuery(id);
      const videos = await client.fetch(videosQuery);
      return res.status(200).json(videos);
    }
  }
}
