import React, { useContext, createContext, useState, useEffect } from "react";

type Returner = {
  isCollapsed: boolean;
  handleIsCollapsed: (e: any) => void;
};

const defaultState = {
  isCollapsed: false,
  handleIsCollapsed: () => null,
} as Returner;

const NavContext = createContext<Returner>(defaultState);

export const NavContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    const cState = localStorage.getItem("isCollapsed");
    if (!cState) {
        setIsCollapsed(false);
        return
    }
    setIsCollapsed(cState === "true");
  }, []);

  const handler = (e: any) => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", !isCollapsed ? "true" : "false");
  };

  return (
    <NavContext.Provider value={{ isCollapsed, handleIsCollapsed: handler }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);
