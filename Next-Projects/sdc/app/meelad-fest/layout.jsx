"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { StateProvider } from "@/libs/contextProvider";
import { ColorModeContext, useMode } from "@/libs/themeSettings";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RootLayout({ children }) {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = Cookies.get("festToken");

    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/profile", { token });
        const { user } = await res.data;
        setUser(user);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    };
    fetchUserData();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StateProvider>
          <main>
            <Topbar user={user} />
            <Sidebar
              dashboardName={user.accessLocation}
              user={user}
            />
            {children}
          </main>
        </StateProvider>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
