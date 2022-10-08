import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id }: any = req.query;
    const query = postDetailQuery(id);
    const data = await client.fetch(query);
    return res.status(200).json(data[0]);
  } else if (req.method === "PUT") {
    const { comment, userId } = req.body;
    const { id }: any = req.query;
    if (id) {
      const response = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuid(),
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
          },
        ])
        .commit();
      return res.status(201).json(response);
    }
  }
}
