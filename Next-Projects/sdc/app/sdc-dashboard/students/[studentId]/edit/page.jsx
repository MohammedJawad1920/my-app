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
import { batchNames } from "@/libs/constants";
import { useRouter } from "next/navigation";

const EditStudent = ({ params: { studentId } }) => {
  const router = useRouter(null);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`/api/students/edit/${studentId}`);
        const { student } = await res.data;
        setStudent(student[0]);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const addressArray =
    student?.address?.split(",").map((item) => item.trim()) || [];
  const [state, district, street, pin] = addressArray;

  const initialValues = {
    studentName: student.studentName || "",
    batchName: student.batchName || "",
    state: state || "",
    district: district || "",
    street: street || "",
    pin: pin || "",
    studentId: student.studentId || "",
    phoneNumber: student.phoneNumber || "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const nameRegExp = /^[a-zA-Z0-9_ ]{3,20}$/;
  const pinRegExp = /^[0-9]{6}$/;

  const studentSchema = yup.object().shape({
    studentName: yup.string().matches(nameRegExp, "Invalid name format"),
    batchName: yup.string(),
    state: yup.string(),
    district: yup.string(),
    street: yup.string(),
    pin: yup.string().matches(pinRegExp, "Invalid PIN code"),
    studentId: yup.string(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

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
      console.log(values);

      await axios.post(`/api/students/edit/${studentId}`, {
        prevId: student.studentId,
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
      router.push("/sdc-dashboard/students/student-details");
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
                  error={!!touched.StudentName && !!errors.StudentName}
                  helperText={touched.StudentName && errors.StudentName}
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

export default EditStudent;
