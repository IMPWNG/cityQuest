import { QuestTypeChip } from "@/components/QuestTypeChip";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from 'next';
import clsx from "clsx";
import { Console } from "console";

interface Quest {
    id: string;
    title: string;
    content: string;
    type: string;
    reward: boolean;
    amountReward: number;
    published: boolean;
}

interface QuestFeedProps {
    data: Quest[];
}

async function getQuests() {
    const res = await fetch(`${process.env.BASE_URL}/api/getQuests/`);
    if (!res.ok) {
        console.log("error1", res);
    }
    return res.json();
}

async function handleDeletePost(id: number) {
    const res = await fetch(
        `${process.env.BASE_URL}/api/deletePost/${id}`,
        {
            method: "DELETE",
        }
    );
    if (!res.ok) {
        console.log("error2", res);
    }
}

export default function QuestFeed({ data: initialData }: QuestFeedProps) {
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

    const cardBorderColor: { [key: string]: string } = {
        fetch: "border-blue-400 border-4",
        help: "border-green-400 border-4",
        skill: "border-red-400 border-4",
    };

    return (
        console.log(data),
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className="flex flex-col items-center justify-center">
                {Array.isArray(data) &&
                    data.map((quest: any) => (
                        <div
                            key={quest.id}
                            className={clsx(
                                "shadow-lg rounded-lg mx-auto max-w-md my-4 p-6 overflow-hidden bg-slate-200    ",
                                cardBorderColor[quest.type]
                            )}
                        >
                     
                            <div className="flex items-center mb-4 justify-center">
                               
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {quest.title}
                                </h2>
                            </div>
                            <div key={quest.id} className="flex flex-col my-4">
                                <QuestTypeChip selected={true} type={quest.type}>
                                    {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}
                                </QuestTypeChip>

                            </div>
                            <p className="text-gray-700 leading-relaxed">{quest.content}</p>
                          
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
        </main>
    );
} 

export const getServerSideProps: GetServerSideProps<QuestFeedProps> = async () => {
    const questsFeed = await getQuests();
    return {
        props: {
            data: questsFeed,
        },
    };
};
