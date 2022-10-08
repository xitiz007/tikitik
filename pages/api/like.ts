import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const {
      userId,
      postId,
      like,
    }: { userId: string; postId: string; like: boolean } = req.body;
    const response = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
      
    return res.status(200).json(response);
  }
}
