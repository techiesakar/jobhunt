"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allCompanies: any;
};

export const CompanyContext = createContext<ContextTypes>({} as ContextTypes);

export default function CompanyContextProvider({ children }: PropsType) {
  const [allCompanies, setAllCompanies] = useState<any>([]);

  const getCompanies = () => {
    try {
      axios
        .get("/company")
        .then((res) => {
          setAllCompanies([...res.data.result]);
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
    <CompanyContext.Provider
      value={{
        allCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompanyContext() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error(
      "useCompanyContext must be used within a CompanyContextProvider"
    );
  }
  return context;
}
