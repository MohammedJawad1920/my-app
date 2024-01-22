"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/libs/themeSettings";
import {
  AdminPanelSettingsOutlined,
  Close,
  EditOutlined,
} from "@mui/icons-material";
import { LockOpenOutlined } from "@mui/icons-material";
import { SecurityOutlined } from "@mui/icons-material";
import Header from "@/components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

const UserDetails = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [profile, setProfile] = useState([]);

  const router = useRouter(null);

  useEffect(() => {
    const token = Cookies.get("libraryToken");

    const fetchProfile = async () => {
      try {
        const res = await axios.post("/api/profile", { token });
        const { user } = await res.data;
        setProfile(user);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    };
    fetchProfile();
  }, []);

  const handleDelete = async (_id) => {
    const token = Cookies.get("sdcToken");
    try {
      await axios.post("/api/users", { _id, token });
      fetchUserData();
      handleCloseDialog();
    } catch (err) {
      console.log("Error:", err.response.data.msg);
    }
  };
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const columns = [
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <div className="container">
            <Box
              width="60%"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "administrative"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              {role === "Administrator" && <AdminPanelSettingsOutlined />}
              {role === "Library Chief" && <SecurityOutlined />}
              {role === "Library Editor" && <EditOutlined />}
              {role === "Subscriber" && <LockOpenOutlined />}
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px" }}
              >
                {role}
              </Typography>
            </Box>
          </div>
        );
      },
    },
  ];
  const mdColumns = [
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <div className="container">
            <Box
              width="60%"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "administrative"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              {role === "Administrator" && <AdminPanelSettingsOutlined />}
              {role === "Library Chief" && <SecurityOutlined />}
              {role === "Library Editor" && <EditOutlined />}
              {role === "Subscriber" && <LockOpenOutlined />}
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px" }}
              >
                {role}
              </Typography>
            </Box>
          </div>
        );
      },
    },
  ];
  const smColumns = [
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <div className="container mx-auto">
      <Box m="20px">
        <Header
          title="USER"
          subtitle="Managing the User Deatails"
        />
        <Box
          m="40px 0 0 0"
          height="70vh"
          overflow="auto"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            onRowClick={handleRowClick}
            className="hidden lg:flex"
          />
          <DataGrid
            rows={data}
            columns={mdColumns}
            getRowId={(row) => row._id}
            onRowClick={handleRowClick}
            className="hidden md:flex lg:hidden"
          />
          <DataGrid
            rows={data}
            columns={smColumns}
            getRowId={(row) => row._id}
            onRowClick={handleRowClick}
            className=" md:hidden"
          />
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          sx={{ position: "absolute", top: 5, right: 15 }}
        >
          <Close />
        </IconButton>
        <DialogContent
          sx={{ background: colors.blueAccent[800], padding: "20px" }}
        >
          {selectedRow && (
            <Box
              display="flex"
              flexDirection="column"
              gap="15px"
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
              >
                User Details
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Name:</Typography>
                <Typography>{selectedRow.username}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Phone:</Typography>
                <Typography>{selectedRow.phoneNumber}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Email:</Typography>
                <Typography>{selectedRow.email}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Access Level:</Typography>
                <Typography>{selectedRow.role}</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
              >
                {profile._id !== selectedRow._id && (
                  <button
                    onClick={() => handleDelete(selectedRow._id)}
                    mt={2}
                    className="bg-red-500  px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                )}

                <button
                  onClick={() => {
                    router.push(
                      `/sdc-dashboard/user-management/edit/${selectedRow._id}`
                    );
                  }}
                  mt={2}
                  className="bg-white text-black  px-4 py-2 rounded"
                >
                  Edit
                </button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetails;
