import Link from "next/link";
import Form from "@/components/Form";
import React, { useState, useEffect } from "react";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`);
  if (!res.ok) {
    console.log("error", res);
  }
  return res.json();
}

async function handleDeletePost(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/deletePost/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    console.log("error", res);
  }

}


export default function Home({ data: initialData }: any) {
  const [data, setData] = useState<[]>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const deletePost = async (id: number) => {
    await handleDeletePost(id);
    const updatedData = await getPosts();
    setData(updatedData);
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">City Quest</h1>
      <Form />
      <div className="flex flex-col items-center justify-center">
        {data.map((post: any) => (
          <div
            key={post.id}
            className="flex flex-col items-center justify-center border-2 border-gray-400 p-2 rounded-md text-white mt-2"
          >
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-600 text-white p-2 rounded-md mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <p className="text-xl text-center">
        Go to about page{" "}
        <Link href="/about" className="text-blue-600 hover:underline">
          here
        </Link>
      </p>
    </main>
  );
}

export async function getServerSideProps() {
  const data = await getPosts();

  return {
    props: {
      data, 
    },
  };
}
