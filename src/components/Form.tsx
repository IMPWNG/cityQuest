import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [title, setTitle] = useState<string>("");

  const router = useRouter();

  async function handleSubmitPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/createPost/`,
      {
        method: "POST",
        body: JSON.stringify({ title }),
      }
    );
    const res = await data.json();
    router.refresh();
    if (!res.ok) {
      console.log("error", res);
    }
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmitPost}
      className="flex flex-col items-center justify-center"
    >
      <input
        type="text"
        placeholder="Title"
        className="border-2 border-gray-400 p-2 rounded-md text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-md mt-2"
      >
        Submit
      </button>
    </form>
  );
}
