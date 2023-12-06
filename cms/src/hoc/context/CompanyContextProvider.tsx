import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CompanyType } from "@/types/Types";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allCompanies: CompanyType[];
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CompanyContext = createContext<ContextTypes>({} as ContextTypes);

export default function CompanyContextProvider({ children }: PropsType) {
  const [allCompanies, setAllCompanies] = useState<CompanyType[]>([]);

  const [change, setChange] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const getTable = useCallback(() => {
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
  }, []);

  useMemo(() => {
    getTable();
  }, [change]);

  return (
    <CompanyContext.Provider
      value={{
        allCompanies,
        setLoading,
        setChange,
        loading,
        change,
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
