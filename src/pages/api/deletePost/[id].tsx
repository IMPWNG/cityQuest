import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const postId = parseInt(id as string, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ msg: "Invalid post id" });
    }

    if (req.method === "DELETE") {
      try {
        const data = await prisma.post.delete({
          where: {
            id: postId,
          },
        });
        res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ msg: "Error deleting post" });
      }
    } else {
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).json({ msg: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
