import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type postProps = {
  title: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post: postProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (!post.title.length && !post.content.length) {
        return res.status(400).json({ msg: "Please enter a title" });
      }
      try {
        const data = await prisma.post.create({
          data: {
            title: post.title,
            content: post.content,
          },
        });
        res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ msg: "Error creating post" });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
