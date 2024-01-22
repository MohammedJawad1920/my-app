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
import { BeatLoader } from "react-spinners";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "@/components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const initialValues = {
  email: "",
  username: "",
  role: "",
  phoneNumber: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const usernameRegExp = /^[a-zA-Z0-9_]{3,20}$/;

const userSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  username: yup
    .string()
    .matches(usernameRegExp, "Invalid username format")
    .required("Username is required"),
  role: yup.string().required("Role is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const { email, username, role, phoneNumber } = values;
      setLoading(true);
      await axios.post("/api/signup", {
        email,
        username,
        role,
        phoneNumber,
        accessLocation: "Library",
      });
      setLoading(false);

      setMessage("User created successfully");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.msg || "Failed to create user");
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
          title="CREATE USER"
          subtitle="Create a New User Profile"
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
          validationSchema={userSchema}
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
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />

                <FormControl
                  variant="filled"
                  fullWidth
                >
                  <InputLabel htmlFor="role">Select Your Role</InputLabel>
                  <Select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    name="role"
                    error={!!touched.role && !!errors.role}
                    inputProps={{ id: "role" }}
                  >
                    <MenuItem value="Subscriber">Subscriber</MenuItem>
                    <MenuItem value="Administrator">Administrator</MenuItem>
                    <MenuItem value="Library Chief">Library Chief</MenuItem>
                    <MenuItem value="Library Editor">Library Editor</MenuItem>
                  </Select>
                </FormControl>

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
                  className="bg-[#4cceac] font-semibold w-40 h-8"
                >
                  {loading ? (
                    <BeatLoader
                      color={"#ffffff"}
                      size={10}
                    />
                  ) : (
                    "Create New User"
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

export default CreateUser;
