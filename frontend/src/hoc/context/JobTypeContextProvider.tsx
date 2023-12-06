"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allJobtypes: any;
};

export const JobtypeContext = createContext<ContextTypes>({} as ContextTypes);

export default function JobtypeContextProvider({ children }: PropsType) {
  const [allJobtypes, setAllJobtypes] = useState<any>([]);

  const getJobtypes = () => {
    try {
      axios
        .get("/jobtype")
        .then((res) => {
          setAllJobtypes([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobtypes();
  }, []);

  return (
    <JobtypeContext.Provider
      value={{
        allJobtypes,
      }}
    >
      {children}
    </JobtypeContext.Provider>
  );
}

export function useJobtypeContext() {
  const context = useContext(JobtypeContext);
  if (!context) {
    throw new Error(
      "useJobtypeContext must be used within a JobtypeContextProvider"
    );
  }
  return context;
}
