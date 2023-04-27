import FetchQuestForm from "@/components/FetchQuestForm";
import HelpQuestForm from "@/components/HelpQuestForm";
import SkillQuestForm from "@/components/SkillQuestForm";
import React, { useState } from "react";
import { useSession } from "next-auth/react";


export default function Home() {
 
  const [formType, setFormType] = useState<string | null>(null);



  const { data: session, status } = useSession();


  const renderForm = () => {
    switch (formType) {
      case "fetch":
        return <FetchQuestForm />;
      case "help":
        return <HelpQuestForm />;
      case "skill":
        return <SkillQuestForm />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center text-yellow-700">
            Create a Quest
            </h1>
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">
                What kind of quest do you want to create?
            </h2>
            <div className="flex flex-row items-center justify-center space-x-4">
            <button className="bg-green-600 text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-green-700" onClick={() => setFormType("fetch")}>
              Fetch Quests
            </button>
            <button className="bg-green-600 text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-green-700" onClick={() => setFormType("skill")}>
             Skill Quests
            </button>
            <button className="bg-green-600 text-white p-2 rounded-md mt-2 transition duration-200 ease-in-out hover:bg-green-700" onClick={() => setFormType("help")}>
              Help Quests
            </button>
            </div>
            
            {renderForm()}
          
          
          </div>
          )}
     
      </main>
  );
}
