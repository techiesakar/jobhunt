import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { JobTypeType } from "@/types/Types";

// This is used to describe the type of Context
type ContextType = {
  allJobTypes: JobTypeType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
};

export const JobTypeContext = createContext<ContextType>({} as ContextType);

export default function JobTypeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Change is used to update Table without reloading using useMemo
  const [change, setChange] = useState<boolean>(false);

  // Get all the jobtypes lists
  const [allJobTypes, setAllJobTypes] = useState<JobTypeType[]>([]);

  // For Loading behaviour
  const [loading, setLoading] = useState<boolean>(false);

  // Get Request
  const getTable = useCallback(() => {
    try {
      axios
        .get("/jobtype")
        .then((res) => {
          setAllJobTypes([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, [change]);

  useMemo(() => {
    getTable();
  }, [change]);

  return (
    <JobTypeContext.Provider
      value={{
        allJobTypes,
        setLoading,
        setChange,
        loading,
        change,
      }}
    >
      {children}
    </JobTypeContext.Provider>
  );
}

export function useJobTypeContext() {
  const context = useContext(JobTypeContext);
  if (!context) {
    throw new Error(
      "useJobTypeContext must be used within a JobTypeContextProvider"
    );
  }
  return context;
}
