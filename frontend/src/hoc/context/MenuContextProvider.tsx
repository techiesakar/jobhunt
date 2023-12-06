import React, { createContext, useState, useContext } from "react";

type PropsType = {
  children: React.ReactNode;
};

type ContextType = {
  menuToggle: boolean;
  setMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuToggleContext = createContext<ContextType | undefined>(
  undefined
);

export default function MenuContextProvider({ children }: PropsType) {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <MenuToggleContext.Provider
      value={{
        menuToggle,
        setMenuToggle,
      }}
    >
      {children}
    </MenuToggleContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuToggleContext);
  if (!context) {
    throw new Error(
      "useMenuToggleContext must be used within a MenuToggleContextProvider"
    );
  }
  return context;
}
