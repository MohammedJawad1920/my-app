import BookDetailsContainer from "@/components/BookDetailsContainer";

const fetchBookData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/books/get`, {
    next: { revalidate: 5 },
  });
  const data = await res.json();
  const books = await data.books;
  return books;
};
const BookDetails = async () => {
  const data = await fetchBookData();

  console.log(data);

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
