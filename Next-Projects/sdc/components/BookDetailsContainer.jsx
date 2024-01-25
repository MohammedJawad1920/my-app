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
import { useEffect, useState } from "react";
import axios from "axios";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const BookDetails = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookData, setBookData] = useState(data);

  const fetchBookData = async () => {
    const res = await fetch(`/api/books/get`);
    const data = await res.json();
    const books = data.books;
    setBookData(books);
  };

  console.log(bookData);

  useEffect(() => {
    fetchBookData();
  }, []);

  const books = bookData.length !== 0 ? bookData : data;
  const router = useRouter(null);

  const handleDelete = async (bookId) => {
    try {
      await axios.post("/api/books/delete", { bookId });
      // fetchBookData();
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
    { field: "bookId", headerName: "ID" },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "author",
      headerName: " Author",
      flex: 1,
    },
    {
      field: "language",
      headerName: "Language",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category ",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price ",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <div className="container">
            <Box
              width="60%"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                status === "Available"
                  ? colors.greenAccent[700]
                  : colors.redAccent[700]
              }
              borderRadius="4px"
            >
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px" }}
              >
                {status}
              </Typography>
            </Box>
          </div>
        );
      },
    },
  ];
  const smColumns = [
    { field: "bookId", headerName: "ID" },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const mdColumns = [
    { field: "bookId", headerName: "ID" },
    {
      field: "bookName",
      headerName: "Book Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "author",
      headerName: " Author",
      flex: 1,
    },
    {
      field: "language",
      headerName: "Language",
      flex: 1,
    },
  ];

  return (
    <div className="container mx-auto">
      <Box m="20px">
        <Header
          title="BOOKS"
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
          <div className=" min-h-full hidden lg:flex">
            <DataGrid
              rows={books}
              columns={columns}
              getRowId={(row) => row.bookId}
              style={{ height: "70vh" }}
              onRowClick={handleRowClick}
            />
          </div>

          <div className=" min-h-full hidden md:flex lg:hidden">
            <DataGrid
              rows={books}
              columns={mdColumns}
              getRowId={(row) => row.bookId}
              style={{ height: "70vh" }}
              onRowClick={handleRowClick}
            />
          </div>
          <div className=" min-h-full  md:hidden">
            <DataGrid
              rows={books}
              columns={smColumns}
              getRowId={(row) => row.bookId}
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
                Book Details
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>ID:</Typography>
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
                <Typography>Author:</Typography>
                <Typography>{selectedRow.author}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Language:</Typography>
                <Typography>{selectedRow.language}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Category:</Typography>
                <Typography>{selectedRow.category}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Status:</Typography>
                <Typography>{selectedRow.status}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Price:</Typography>
                <Typography>{selectedRow.price} Rs</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <button
                  onClick={() => handleDelete(selectedRow.bookId)}
                  mt={2}
                  className="bg-red-500  px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `/sdc-dashboard/books/${selectedRow.bookId}/edit`
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

export default BookDetails;
