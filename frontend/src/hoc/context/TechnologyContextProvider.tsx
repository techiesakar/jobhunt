"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allTechnologies: any;
};

export const TechnologyContext = createContext<ContextTypes>(
  {} as ContextTypes
);

export default function TechnologyContextProvider({ children }: PropsType) {
  const [allTechnologies, setAllTechnologies] = useState<any>([]);

  const getCompanies = () => {
    try {
      axios
        .get("/technology")
        .then((res) => {
          setAllTechnologies([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <TechnologyContext.Provider
      value={{
        allTechnologies,
      }}
    >
      {children}
    </TechnologyContext.Provider>
  );
}

export function useTechnologyContext() {
  const context = useContext(TechnologyContext);
  if (!context) {
    throw new Error(
      "useTechnologyContext must be used within a TechnologyContextProvider"
    );
  }
  return context;
}
