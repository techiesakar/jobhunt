"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allLocations: any;
};

export const LocationContext = createContext<ContextTypes>({} as ContextTypes);

export default function LocationContextProvider({ children }: PropsType) {
  const [allLocations, setAllLocations] = useState<any>([]);

  const getLocations = () => {
    try {
      axios
        .get("/location", { withCredentials: true })
        .then((res) => {
          setAllLocations([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        allLocations,
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
