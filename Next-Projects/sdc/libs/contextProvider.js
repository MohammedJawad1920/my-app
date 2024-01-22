"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

export const StateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </StateContext.Provider>
  );
};
