"use client";

import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { MenuOutlined } from "@mui/icons-material";
import { ColorModeContext, tokens } from "@/libs/themeSettings";
import { useContext, useEffect, useRef, useState } from "react";
import { useStateContext } from "@/libs/contextProvider";
import { useRouter } from "next/navigation";
import UserDetails from "./UserDetails";
import Cookies from "js-cookie";

const Topbar = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const router = useRouter();
  const userDetailsRef = useRef(null);

  const { setIsSidebarOpen } = useStateContext();

  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const onLogout = async () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleClickOutside = (event) => {
    if (
      userDetailsRef.current &&
      !userDetailsRef.current.contains(event.target)
    ) {
      setIsUserDetailOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="container mx-auto relative "
      ref={userDetailsRef}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
      >
        <Box>
          {/* Menu button to open the sidebar */}
          <IconButton onClick={openSidebar}>
            <MenuOutlined />
          </IconButton>
        </Box>

        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => setIsUserDetailOpen(!isUserDetailOpen)}>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Render the UserDetailPopup conditionally */}
      {isUserDetailOpen && (
        <UserDetails
          user={user}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default Topbar;
