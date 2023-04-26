import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getSession } from "next-auth/react";

type questProps = {
  title: string;
  content: string;
  type: string;
  reward: boolean;
  amoutReward: number;
  published: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const session = await getSession({ req });
  try {
    const quest: questProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (!quest.title.length && !quest.content.length) {
        return res.status(400).json({ msg: "Please enter a title" });
      }
      try {
        const data = await prisma.quest.create({
          data: {
            title: quest.title,
            content: quest.content,
            type: quest.type,
            reward: quest.reward,
            published: quest.published,
            amoutReward: quest.amoutReward,
            user: { connect: { email: session?.user?.email || "" } },
          },
        });
        res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ msg: "Error creating quest" });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
