"use client";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "@/components/Header";
import axios from "axios";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { batchNames } from "@/libs/constants";
import { useEffect } from "react";

const initialValues = {
  studentName: "",
  batchName: "",
  state: "",
  district: "",
  street: "",
  pin: "",
  studentId: "",
  phoneNumber: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const nameRegExp = /^[a-zA-Z0-9_ ]{3,20}$/;
const pinRegExp = /^[0-9]{6}$/;

const studentSchema = yup.object().shape({
  studentName: yup
    .string()
    .matches(nameRegExp, "Invalid name format")
    .required("Name is required"),
  batchName: yup.string().required("Batch name is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  street: yup.string().required("Street is required"),
  pin: yup
    .string()
    .matches(pinRegExp, "Invalid PIN code")
    .required("PIN is required"),
  studentId: yup.string().required("Register No is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

const StudentRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const {
        studentName,
        state,
        district,
        street,
        pin,
        studentId,
        phoneNumber,
        batchName,
      } = values;

      await axios.post("/api/students/post", {
        studentName,
        state,
        district,
        street,
        pin,
        studentId,
        phoneNumber,
        batchName,
      });

      setMessage("Student successfully registered!");
      resetForm();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.response.data.msg);
      setMessage(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Box
        m="20px"
        maxWidth="768px"
        marginX="auto"
        p="20px"
      >
        <Header
          title="REGISTARTION"
          subtitle="Register a new student"
        />
        {message && (
          <div
            style={{
              background: message.includes("successfully") ? "green" : "red",
            }}
            className="p-3 w-full text-center"
          >
            {message}
          </div>
        )}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={studentSchema}
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
              <Box className=" space-y-5">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Student Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.studentName}
                  name="studentName"
                  error={!!touched.studentName && !!errors.studentName}
                  helperText={touched.studentName && errors.studentName}
                />
                <FormControl
                  variant="filled"
                  fullWidth
                >
                  <InputLabel htmlFor="batchName">Batch Name</InputLabel>
                  <Select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="batchName"
                    value={values.batchName}
                    error={!!touched.batchName && !!errors.batchName}
                    helperText={!!touched.batchName && !!errors.batchName}
                    inputProps={{ id: "batchName" }}
                  >
                    {batchNames.map((name, index) => (
                      <MenuItem
                        key={index}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  variant="filled"
                  fullWidth
                >
                  <InputLabel htmlFor="state">State</InputLabel>
                  <Select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state"
                    error={!!touched.state && !!errors.state}
                    helperText={!!touched.state && !!errors.state}
                    inputProps={{ id: "state" }}
                  >
                    <MenuItem value="Kerala">Kerala</MenuItem>
                    <MenuItem value="Karnataka">Karnataka</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="District"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.district}
                  name="district"
                  error={!!touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.street}
                  name="street"
                  error={!!touched.street && !!errors.street}
                  helperText={touched.street && errors.street}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Pin"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pin}
                  name="pin"
                  error={!!touched.pin && !!errors.pin}
                  helperText={touched.pin && errors.pin}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Register No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.studentId}
                  name="studentId"
                  error={!!touched.studentId && !!errors.studentId}
                  helperText={touched.studentId && errors.studentId}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
              >
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className="bg-[#4cceac] font-semibold w-44 h-8"
                >
                  {loading ? (
                    <BeatLoader
                      color={"#ffffff"}
                      size={10}
                    />
                  ) : (
                    "Register New Student"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default StudentRegistration;
