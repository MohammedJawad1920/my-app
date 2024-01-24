"use client";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/libs/themeSettings";

import Header from "@/components/Header";
import { useState } from "react";
import { Close } from "@mui/icons-material";

const rentalList = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: "bookId", headerName: "Book ID", flex: 1 },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    { field: "studentId", headerName: "Student ID", flex: 1.5 },
    {
      field: "studentName",
      headerName: "Student Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "rentedDate",
      headerName: "Rented on",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "recievedDate",
      headerName: "Recieved on",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
  ];
  const smColumns = [
    { field: "bookId", headerName: "ID", flex: 1 },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
  ];
  const mdColumns = [
    { field: "bookId", headerName: "Book ID", flex: 1 },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    { field: "studentId", headerName: "Student ID", flex: 1 },
    {
      field: "studentName",
      headerName: "Student Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <div className="container mx-auto">
      <Box m="20px">
        <Header
          title="RENTALS"
          subtitle="Managing the Book Deatails"
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
          <div className="hidden lg:flex">
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              style={{ height: "70vh" }}
              onRowClick={handleRowClick}
            />
          </div>
          <div className="hidden md:flex lg:hidden">
            <DataGrid
              rows={data}
              columns={mdColumns}
              getRowId={(row) => row._id}
              style={{ height: "70vh" }}
              onRowClick={handleRowClick}
            />
          </div>
          <div className=" md:hidden">
            <DataGrid
              rows={data}
              columns={smColumns}
              getRowId={(row) => row._id}
              style={{ height: "70vh" }}
              onRowClick={handleRowClick}
            />
          </div>
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
                rental Details
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Book ID:</Typography>
                <Typography>{selectedRow.bookId}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Book:</Typography>
                <Typography>{selectedRow.bookName}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Student ID:</Typography>
                <Typography>{selectedRow.studentId}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Student:</Typography>
                <Typography>{selectedRow.studentName}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Rented on:</Typography>
                <Typography>{selectedRow.rentedDate}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Recieved on:</Typography>
                <Typography>{selectedRow.recievedDate}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default rentalList;
