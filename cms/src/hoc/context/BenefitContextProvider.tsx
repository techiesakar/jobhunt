import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { BenefitType } from "@/types/Types";

// This is used to describe the type of Context
type ContextType = {
  allBenefits: BenefitType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
};

export const BenefitContext = createContext<ContextType>({} as ContextType);

export default function BenefitContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Change is used to update Table without reloading using useMemo
  const [change, setChange] = useState<boolean>(false);

  // Get all the benefits lists
  const [allBenefits, setAllBenefits] = useState<BenefitType[]>([]);

  // For Loading behaviour
  const [loading, setLoading] = useState<boolean>(false);

  // Get Request
  const getTable = useCallback(() => {
    try {
      axios
        .get("/benefit")
        .then((res) => {
          setAllBenefits([...res.data.result]);
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
    <BenefitContext.Provider
      value={{
        allBenefits,
        setLoading,
        setChange,
        loading,
        change,
      }}
    >
      {children}
    </BenefitContext.Provider>
  );
}

export function useBenefitContext() {
  const context = useContext(BenefitContext);
  if (!context) {
    throw new Error(
      "useBenefitContext must be used within a BenefitContextProvider"
    );
  }
  return context;
}
