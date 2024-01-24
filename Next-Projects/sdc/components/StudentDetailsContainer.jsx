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
import { Close } from "@mui/icons-material";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const StudentDetails = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [studentData, setStudentData] = useState(data);

  const fetchStudentData = async () => {
    const res = await fetch(`/api/students/get`);
    const data = await res.json();
    const students = data.students;
    setStudentData(students);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.post("/api/students/delete", { studentId });
      fetchStudentData();
      handleCloseDialog();
    } catch (err) {
      console.log("Error:", err?.response?.data?.msg);
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
    { field: "studentId", headerName: "Register No" },
    {
      field: "studentName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "batchName",
      headerName: "Batch Name",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
  ];
  const mdColumns = [
    { field: "studentId", headerName: "Register No" },
    {
      field: "studentName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "batchName",
      headerName: "Batch Name",
      flex: 1,
    },
  ];
  const smColumns = [
    { field: "studentId", headerName: "Register No" },
    {
      field: "studentName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <div className="container mx-auto">
      <Box m="20px">
        <Header
          title="STUDENTS"
          subtitle="Managing the Student Details"
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
            rows={studentData}
            columns={columns}
            getRowId={(row) => row.studentId}
            onRowClick={handleRowClick}
            className="hidden lg:flex"
          />
          <DataGrid
            rows={studentData}
            columns={mdColumns}
            getRowId={(row) => row.studentId}
            onRowClick={handleRowClick}
            className="hidden md:flex lg:hidden"
          />
          <DataGrid
            rows={studentData}
            columns={smColumns}
            getRowId={(row) => row.studentId}
            onRowClick={handleRowClick}
            className="md:hidden"
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
          sx={{ position: "absolute", top: 5, right: 10 }}
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
                Student Details
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography> Register No:</Typography>
                <Typography>{selectedRow.studentId}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Student Name:</Typography>
                <Typography>{selectedRow.studentName}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Batch Name:</Typography>
                <Typography>{selectedRow.batchName}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Address:</Typography>
                <Typography>{selectedRow.address}</Typography>
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
                <button
                  onClick={() => handleDelete(selectedRow.studentId)}
                  mt={2}
                  className="bg-red-500  px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `/sdc-dashboard/students/${selectedRow.studentId}/edit`
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

export default StudentDetails;
