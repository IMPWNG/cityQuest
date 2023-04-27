import React from "react";
import type { ReactNode } from "react";

interface QuestTypeChipProps {
    children: ReactNode;
    selected: boolean;
    type: string;
}

type ChipColorType = {
    [key: string]: string;
};

const QuestTypeChip = ({ children, selected, type }: QuestTypeChipProps) => {
    const chipColor: ChipColorType = {
        fetch: "bg-blue-400",
        help: "bg-green-400",
        skill: "bg-red-400",
    };

    return (
        <button
            className={`${selected ? chipColor[type] : "bg-red-600"
                } flex items-center justify-center px-4 py-2 m-2 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-opacity-80`}
        >
            <span className="mr-2">
                {type === "fetch" && <i className="fas fa-download"></i>}
                {type === "explore" && <i className="fas fa-compass"></i>}
                {type === "battle" && <i className="fas fa-fist-raised"></i>}
            </span>
            {children}
        </button>
    );
};

export { QuestTypeChip };
