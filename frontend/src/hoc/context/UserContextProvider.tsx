import React, { createContext, useContext, useState } from "react";
type PropsType = {
  children: React.ReactNode;
};

type ContextType = {
  currentUserID: string;
  setCurrentUserID: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<ContextType>({} as ContextType);

export default function UserContextProvider({ children }: PropsType) {
  const [currentUserID, setCurrentUserID] = useState<string>("");

  return (
    <UserContext.Provider value={{ currentUserID, setCurrentUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useCompanyContext must be used within a CompanyContextProvider"
    );
  }
  return context;
}
