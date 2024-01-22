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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditUser = ({ params: { _id } }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);

  const router = useRouter(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/users/getUserData", { _id });
        const { user } = await res.data;
        setUser(user);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    };
    fetchUserData();
  }, []);
  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const initialValues = {
    email: user.email || "",
    username: user.username || "",
    password: "",
    confirmPassword: "",
    role: user.role || "",
    userId: user.userId || "",
    phoneNumber: user.phoneNumber || "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const usernameRegExp = /^[a-zA-Z0-9_]{3,20}$/;

  const userSchema = yup.object().shape({
    email: yup.string(),
    username: yup.string().matches(usernameRegExp, "Invalid username format"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters and include a letter and a number"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string(),
    userId: yup.string(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const _id = user._id;
      const { username, role, phoneNumber, password } = values;
      setLoading(true);
      await axios.post("/api/profile/edit", {
        _id,
        username,
        password,
        role,
        phoneNumber,
      });
      setMessage("User updated successfully");
      router.push("/sdc-dashboard/user-management/user-details");
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.msg || "Failed to upadate user");
    } finally {
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
          title="PROFILE"
          subtitle="Edit Your Profile"
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
          enableReinitialize
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
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
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
                    "Save"
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

export default EditUser;
