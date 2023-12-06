"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allSkills: any;
};

export const SkillContext = createContext<ContextTypes>({} as ContextTypes);

export default function SkillContextProvider({ children }: PropsType) {
  const [allSkills, setAllSkills] = useState<any>([]);

  const getSkills = () => {
    try {
      axios
        .get("/skill")
        .then((res) => {
          setAllSkills([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <SkillContext.Provider
      value={{
        allSkills,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkillContext() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error(
      "useSkillContext must be used within a SkillContextProvider"
    );
  }
  return context;
}
