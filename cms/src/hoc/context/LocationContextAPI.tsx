import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { LocationType } from "@/types/Types";

type ContextType = {
  allLocations: LocationType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
};

export const LocationContext = createContext<ContextType>({} as ContextType);

export default function LocationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Change is used to update Table without reloading using useMemo
  const [change, setChange] = useState<boolean>(false);

  // Get all the locations lists
  const [allLocations, setAllLocations] = useState<LocationType[]>([]);

  // For Loading behaviour
  const [loading, setLoading] = useState<boolean>(false);

  // Get Request
  const getTable = useCallback(() => {
    try {
      axios
        .get("/location")
        .then((res) => {
          setAllLocations([...res.data.result]);
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
    <LocationContext.Provider
      value={{
        allLocations,
        setLoading,
        setChange,
        loading,
        change,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationContextProvider"
    );
  }
  return context;
}
