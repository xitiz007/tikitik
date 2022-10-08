import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { singleUserQuery, userCreatedPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (userId) {
      const userQuery = singleUserQuery(userId);
      const userVideosQuery = userCreatedPostsQuery(userId);
      const users = await client.fetch(userQuery);
      const userVideos = await client.fetch(userVideosQuery);
      const data = { user: users[0], userVideos };
      return res.status(200).json(data);
    }
  }
}
