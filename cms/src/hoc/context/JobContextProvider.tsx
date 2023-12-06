import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { JobType } from "@/types/Types";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allJobs: JobType[];
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JobContext = createContext<ContextTypes>({} as ContextTypes);

export default function JobContextProvider({ children }: PropsType) {
  const [allJobs, setAllJobs] = useState<JobType[]>([]);

  const [change, setChange] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const getTable = useCallback(() => {
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
  }, []);

  useMemo(() => {
    getTable();
  }, [change]);

  return (
    <JobContext.Provider
      value={{
        allJobs,
        setLoading,
        setChange,
        loading,
        change,
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
