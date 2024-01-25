import BookDetailsContainer from "@/components/BookDetailsContainer";
import axios from "axios";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const fetchBookData = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/api/books/get`);
  const books = await res.data.books;
  return books;
  console.log(books);
};
const BookDetails = async () => {
  const data = await fetchBookData();

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
