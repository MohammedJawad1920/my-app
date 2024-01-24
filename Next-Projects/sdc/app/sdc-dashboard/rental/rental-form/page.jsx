"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "@/components/Header";
import axios from "axios";
import { tokens } from "@/libs/themeSettings";

const initialValues = {
  bookId: "",
};

const checkIdSchema = yup.object().shape({
  bookId: yup.string().required("Book ID is required"),
});
const rentalSchema = yup.object().shape({
  studentId: yup.string().required("Student ID is required"),
});
const recieveSchema = yup.object().shape({
  bookName: yup.string(),
  studentId: yup.string(),
  studentName: yup.string(),
});

const RentalForm = () => {
  const [loading, setLoading] = useState(false);
  const [openRentForm, setOpenRentForm] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [rentalData, setrentalData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [message, setMessage] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleIdCheck = async ({ bookId }, { resetForm }) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/rental/bookIdCheck", { bookId });
      const { book, rental } = res.data;

      setBookData(book);
      setrentalData(rental);
      setMessage(`Book is ${book.status}`);
      if (book.status === "Available") {
        setOpenRentForm(true);
        setIsRented(false);
      }
      if (book.status === "Rented") {
        setIsRented(true);
        setOpenRentForm(false);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.msg : error.message
      );
      setMessage(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentId = async (studentId) => {
    try {
      const res = await axios.post("/api/rental/studentIdCheck", {
        studentId,
      });
      const data = res.data.student;
      setStudentData(data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.msg : error.message
      );
      setStudentData([]);
    }
  };

  const handleRent = async () => {
    const { bookId, bookName } = bookData;
    const { studentId, studentName } = studentData;
    try {
      setLoading(true);
      await axios.post("/api/rental/rent", {
        bookId,
        bookName,
        studentId,
        studentName,
      });
      setMessage("Book Rented Successfully!");
      setOpenRentForm(false);
      setBookData([]);
      setStudentData([]);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.msg : error.message
      );
      setMessage(
        error.response
          ? error.response.data.msg
          : error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleRecieve = async () => {
    const { studentId, bookId } = rentalData;
    try {
      setLoading(true);
      await axios.post("/api/rental/recieve", {
        bookId,
        studentId,
      });
      setMessage("Book Recieved Successfully!");
      setIsRented(false);
      setBookData([]);
      setStudentData([]);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.msg : error.message
      );
      setMessage(
        error.response
          ? error.response.data.msg
          : error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[768px] mx-auto">
      <Box
        m="20px"
        p="20px"
      >
        <Header
          title="RENTAL"
          subtitle="Check the availability of books"
        />
        {message && (
          <div
            style={{
              background:
                message?.includes("Available") ||
                message?.includes("Rented") ||
                message?.includes("Successfully")
                  ? "green"
                  : "red",
            }}
            className="p-3 w-full mb-5 text-center text-white"
          >
            {message}
          </div>
        )}

        <Formik
          onSubmit={handleIdCheck}
          initialValues={initialValues}
          validationSchema={checkIdSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className="grid grid-cols-4 md:flex-row gap-5">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Book ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bookId}
                  name="bookId"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  className="col-span-4 md:col-span-3"
                  error={touched.bookId && errors.bookId}
                  helperText={touched.bookId && errors.bookId}
                />
                <div className="col-span-2 sm:col-span-3 md:hidden"></div>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={loading}
                  className="col-span-2 sm:col-span-1 bg-[#4cceac] font-semibold text-xs p-3 max-h-[50px]"
                >
                  Check Book ID
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      {openRentForm && (
        <Box
          m="20px"
          p="20px"
        >
          <Formik
            enableReinitialize
            onSubmit={handleRent}
            initialValues={{
              bookId: "",
              bookName: "",
              studentId: "",
              studentName: "",
            }}
            validationSchema={rentalSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className="grid grid-cols-4 gap-5">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Book ID"
                    onBlur={handleBlur}
                    value={bookData?.bookId || values.bookId}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    name="bookId"
                    className="col-span-4 md:col-span-1"
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Book Name"
                    onBlur={handleBlur}
                    value={bookData?.bookName || values.bookName}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    name="bookName"
                    className="col-span-4 md:col-span-3 "
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Student ID"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleStudentId(e.target.value);
                      handleChange(e);
                    }}
                    value={values.studentId}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    name="studentId"
                    className="col-span-4 md:col-span-1"
                    error={touched.studentId && errors.studentId}
                    helperText={touched.studentId && errors.studentId}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Student Name"
                    onBlur={handleBlur}
                    value={studentData?.studentName || values.studentName}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    name="studentName"
                    className="col-span-4 md:col-span-3"
                  />

                  <div className="col-span-2 sm:col-span-3 md:col-span-3"></div>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={loading}
                    className="bg-[#4cceac] font-semibold col-span-2 sm:col-span-1"
                  >
                    Rent
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
      {isRented && (
        <Box
          m="20px"
          p="20px"
        >
          <Formik
            enableReinitialize
            onSubmit={handleRecieve}
            initialValues={{
              bookId: "",
              bookName: "",
              studentId: "",
              studentName: "",
            }}
            validationSchema={recieveSchema}
          >
            {({ values, errors, touched, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box className="grid grid-cols-4 gap-5">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Book ID"
                    onBlur={handleBlur}
                    value={rentalData?.bookId}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    name="bookId"
                    className="col-span-4 md:col-span-1"
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Book Name"
                    onBlur={handleBlur}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    value={rentalData?.bookName}
                    name="bookName"
                    className="col-span-4 md:col-span-3 "
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Student ID"
                    value={rentalData?.studentId}
                    name="studentId"
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    className="col-span-4 md:col-span-1"
                    error={touched.studentId && errors.studentId}
                    helperText={touched.studentId && errors.studentId}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Student Name"
                    value={rentalData?.studentName}
                    name="studentName"
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    className="col-span-4 md:col-span-3"
                  />
                  <div className="col-span-2 sm:col-span-3 md:col-span-3"></div>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={loading}
                    className="bg-[#4cceac] font-semibold col-span-2 sm:col-span-1"
                  >
                    Recieve
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </div>
  );
};

export default RentalForm;
