import BookDetailsContainer from "@/components/BookDetailsContainer";
import { unstable_noStore } from "next/cache";

const fetchBookData = async () => {
  unstable_noStore();
  const res = await fetch(`${process.env.BASE_URL}/api/books/get`);
  const data = await res.json();
  const books = await data.books;
  return books;
};
const BookDetails = async () => {
  const data = await fetchBookData();

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
