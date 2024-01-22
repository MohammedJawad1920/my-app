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

const EditBook = ({ params: { bookId } }) => {
  const router = useRouter(null);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(`/api/books/edit/${bookId}`);
        const { book } = await res.data;
        setBook(book[0]);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    };
    fetchBookData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const initialValues = {
    bookName: book.bookName || "",
    author: book.author || "",
    bookId: book.bookId || "",
    category: book.category || "",
    bookId: book.bookId || "",
    language: book.language || "",
    price: book.price || "",
  };

  const bookSchema = yup.object().shape({
    bookName: yup.string(),
    author: yup.string(),
    category: yup.string(),
    bookId: yup.string(),
    language: yup.string(),
    price: yup.string(),
  });

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { bookName, author, category, bookId, language, price } = values;
      console.log(values);

      await axios.post(`/api/books/edit/${bookId}`, {
        prevId: book.bookId,
        bookName,
        author,
        category,
        bookId,
        language,
        price,
      });

      setMessage("Book successfully registered!");
      router.push("/sdc-dashboard/books/book-details");
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
          title="BOOK DETAIL"
          subtitle="Edit Book"
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
          validationSchema={bookSchema}
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
                  label="Book Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bookName}
                  name="bookName"
                  error={!!touched.bookName && !!errors.bookName}
                  helperText={touched.bookName && errors.bookName}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Author"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.author}
                  name="author"
                  error={!!touched.author && !!errors.author}
                  helperText={touched.author && errors.author}
                />

                <FormControl
                  variant="filled"
                  fullWidth
                >
                  <InputLabel htmlFor="language">Select Language</InputLabel>
                  <Select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.language}
                    name="language"
                    error={!!touched.language && !!errors.language}
                    inputProps={{ id: "language" }}
                  >
                    <MenuItem value="Malayalam">Malayalam</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Arabic">Arabic</MenuItem>
                    <MenuItem value="Kannada">Kannada</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  variant="filled"
                  fullWidth
                >
                  <InputLabel htmlFor="category">Select Category</InputLabel>
                  <Select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    inputProps={{ id: "category" }}
                  >
                    <MenuItem value="Novel">Novel</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                    <MenuItem value="Story">Story</MenuItem>
                    <MenuItem value="Travelling">Travelling</MenuItem>
                    <MenuItem value="Biology">Biology</MenuItem>
                    <MenuItem value="Phsycology">Phsycology</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Book ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bookId}
                  name="bookId"
                  error={!!touched.bookId && !!errors.bookId}
                  helperText={touched.bookId && errors.bookId}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
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
                    "Register New Book"
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

export default EditBook;
