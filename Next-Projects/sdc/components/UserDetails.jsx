"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/libs/themeSettings";
import Link from "next/link";

const UserDetails = ({ user, onLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      style={{
        backgroundColor: colors.primary[400],
        border: `1px solid ${colors.grey[500]}`,
        borderRadius: "4px",
        color: colors.grey[100], // Set a light text color
        padding: "16px",
        minWidth: "250px",
        position: "absolute",
        top: "70px",
        right: "30px",

        zIndex: "999",
      }}
    >
      <Typography style={{ marginBottom: "8px" }}>{user.username}</Typography>
      <Typography style={{ marginBottom: "8px" }}>{user.email}</Typography>
      <Typography style={{ marginBottom: "8px" }}>{user.role}</Typography>
      {/* Add more user details as needed */}
      <Box className=" flex justify-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={onLogout}
          style={{
            color: colors.grey[100],
            backgroundColor: colors.blueAccent[600],
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetails;
