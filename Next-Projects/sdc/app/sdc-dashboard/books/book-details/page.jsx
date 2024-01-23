import BookDetailsContainer from "@/components/BookDetailsContainer";
import fetch from "node-fetch";

const fetchBookData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/books/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  const books = await data.books;
  return books;
};
const BookDetails = async () => {
  const data = await fetchBookData();

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
