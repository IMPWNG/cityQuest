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

console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col items-center justify-center">
        <Link href="/login" className="text-blue-600 hover:underline">
        <button
  
          className="bg-blue-600 text-white p-2 rounded-md mt-2"
        >
          Login
        </button>
        </Link>


      </div>

      <h1 className="text-6xl font-bold text-center">City Quest</h1>
      <Form />
      <div className="flex flex-col items-center justify-center">
  
        {data.map((post: any) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg mx-auto max-w-md my-4 p-6 overflow-hidden"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-600 text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-red-700"
              >
                Delete
              </button>
            </div>
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
