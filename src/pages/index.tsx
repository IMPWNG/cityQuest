import Link from "next/link";
import Form from "@/components/Form";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from 'next';
import clsx from "clsx";

interface Quest {
  id: string;
  title: string;
  content: string;
  type: string;
  reward: boolean;
  amountReward: number;
  published: boolean;
}

interface HomeProps {
  data: Quest[];
}

async function getQuests() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getQuests/`);
  if (!res.ok) {
    console.log("error1", res);
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
    console.log("error2", res);
  }
}

export default function Home({ data: initialData }: HomeProps) {
  const [data, setData] = useState<Quest[]>(initialData);

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const deletePost = async (id: number) => {
    await handleDeletePost(id);

    const updatedData = await getQuests();

    setData(updatedData);
  };
  return (
    console.log(data),
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">City Quest</h1>

      {!session ? (
        <div className="flex flex-col items-center justify-center">
          <Link
            href="/api/auth/signin"
            passHref
            className="text-blue-600 hover:underline"
          >
            <button className="bg-blue-600 text-white p-2 rounded-md mt-2">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <p>
            hello {session?.user?.name} ({session?.user?.email})
          </p>
          <Form />
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white p-2 rounded-md mt-2"
          >
            Logout
          </button>
        </>
      )}

      <div className="flex flex-col items-center justify-center">
        {Array.isArray(data) &&
          data.map((quest: any) => (
            <div
              key={quest.id}
              className="bg-gray-100 border-4 border-green-600 shadow-lg rounded-lg mx-auto max-w-md my-4 p-6 overflow-hidden"
            >
              <div className="flex items-center mb-4">
                <img
                  src="/path/to/your/rpg-icon.svg"
                  alt="RPG Icon"
                  className="w-10 h-10 mr-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {quest.title}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{quest.content}</p>
              <p className="text-sm text-gray-500">Type: {quest.type}</p>
              <p className="text-sm text-gray-500">
                Reward: {quest.reward ? quest.amoutReward : 1}
              </p>
              <p className="text-sm text-gray-500">
                Published: {quest.published ? "Yes" : "No"}
              </p>

              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => deletePost(quest.id)}
                  className="bg-red-600 text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  disabled={!session}
                  className={clsx(
                    'text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-blue-700 ml-4',
                    {
                      'bg-blue-600': session,
                      'bg-gray-400': !session,
                    }
                  )}
                >
                  Take Quest
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const questsFeed = await getQuests();
  return {
    props: {
      data: questsFeed,
    },
  };
};
