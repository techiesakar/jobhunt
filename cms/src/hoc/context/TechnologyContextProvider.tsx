import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { TechnologyType } from "@/types/Types";

type ContextType = {
  allTechnologies: TechnologyType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
};

export const TechnologyContext = createContext<ContextType>({} as ContextType);

export default function TechnologyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Change is used to update Table without reloading using useMemo
  const [change, setChange] = useState<boolean>(false);

  // Get all the technologies lists
  const [allTechnologies, setAllTechnologies] = useState<TechnologyType[]>([]);

  // For Loading behaviour
  const [loading, setLoading] = useState<boolean>(false);

  // Get Request
  const getTable = useCallback(() => {
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
  }, []);

  // useMemo get called when changes occur - it happens under Post, Delete and Patch Requests
  useMemo(() => {
    getTable();
  }, [change]);

  return (
    <TechnologyContext.Provider
      value={{
        allTechnologies,
        setLoading,
        setChange,
        loading,
        change,
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
