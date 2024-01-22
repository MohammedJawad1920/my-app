import BookDetailsContainer from "@/components/BookDetailsContainer";
import axios from "axios";

const fetchBookData = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/api/books/get`);
  const books = await res.data.books;
  return books;
};
const BookDetails = async () => {
  const data = await fetchBookData();

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
