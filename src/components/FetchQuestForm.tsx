import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {

  return (
    <div className="bg-gray-100 p-6 w-full  mt-10 rounded-md shadow-lg border-4 border-yellow-400">
      {children}
    </div>
  );
};

export default function FetchQuestForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [reward, setReward] = useState<boolean>(false);
  const [amoutReward, setAmoutReward] = useState<number>(0);
  const [published, setPublished] = useState<boolean>(false);



  const router = useRouter();

  async function handleSubmitPost(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = await fetch(
      `${process.env.BASE_URL}/api/createQuest`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          type,
          reward,
          amoutReward,
          published,
        }),
      }
    );
    const res = await data.json();
    //  router.push('/');
    if (!res.ok) {
      console.log("error", res);
    }
    setTitle("");
    setContent("");
    setType("");
    setReward(false);
    setAmoutReward(0);
    setPublished(false);
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">
        Create a Fetch Quest
      </h2>
      <form
        onSubmit={handleSubmitPost}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="text"
          placeholder="Title"
          className="border-2 border-gray-400 p-2 rounded-md text-black w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          className="border-2 border-gray-400 p-2 rounded-md text-black w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          className="border-2 border-gray-400 p-2 rounded-md text-black w-full mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={reward}
            onChange={(e) => setReward(e.target.checked)}
          />
          <span className="ml-2">Reward</span>
        </label>
        {reward && (
          <input
            type="number"
            placeholder="Amount Reward"
            className="border-2 border-gray-400 p-2 rounded-md text-black w-full mb-2"
            value={amoutReward}
            onChange={(e) => setAmoutReward(parseInt(e.target.value))}
          />
        )}
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span className="ml-2">Published</span>
        </label>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-md mt-2 w-full"
        >
          Submit
        </button>
      </form>
    </Card>
  );
}