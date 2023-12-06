"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allJobs: any;
};

export const JobContext = createContext<ContextTypes>({} as ContextTypes);

export default function JobContextProvider({ children }: PropsType) {
  const [allJobs, setAllJobs] = useState<any>([]);

  const getJobs = () => {
    try {
      axios
        .get("/job")
        .then((res) => {
          setAllJobs([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        allJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobContextProvider");
  }
  return context;
}
