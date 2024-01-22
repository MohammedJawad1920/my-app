"use client";
import { StateProvider } from "@/libs/contextProvider";

const StateProviderContainer = () => {
  return (
    <StateProvider>
      <Topbar />
      <Sidebar />
    </StateProvider>
  );
};

export default StateProviderContainer;
