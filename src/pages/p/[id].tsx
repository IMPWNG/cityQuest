import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import prisma from "../../../prisma/client";
import { ParsedUrlQuery } from "querystring";

interface QuestInd {
    id?: string;
    title?: string;
    content?: string | null;
    type?: string;
    reward?: boolean;
    amountReward?: number;
    published?: boolean;
}

const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<{ quest: QuestInd & { user: { name: string | null } | null } | null }>> => {
    const quest = await prisma.quest.findUnique({
        where: {
            id: context.params?.id as string,
        },
        include: {
            user: {
                select: { name: true },
            },
        },
    });

    if (!quest) {
        return {
            notFound: true,
        };
    }

    // Create a new object with the post data and update the 'createdAt' and 'updatedAt' fields to a JSON serializable format
    const serializableQuest = {
        ...quest,
        createdAt: quest.createdAt ? quest.createdAt.toISOString() : null,
        updatedAt: quest.updatedAt ? quest.updatedAt.toISOString() : null,
    };

    return {
        props: {
            quest: serializableQuest,
        },
    };
};

const QuestPage = ({ quest }: { quest: QuestInd & { user: { name: string | null } | null } | null }) => {

        return (
            <div>
                <h1>Quest</h1>
                <p className="text-2xl font-bold mb-4 text-center text-yellow-700">
                    {quest?.title}
                </p>
            </div>
        );
    };

export default QuestPage;
    export { getServerSideProps };

