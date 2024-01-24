import BookDetailsContainer from "@/components/BookDetailsContainer";

const BookDetails = async () => {
  const fetchBookData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/books/get`, {
      cache: "no-store",
    });
    const data = await res.json();
    const books = await data.books;
    return books;
  };
  const data = await fetchBookData();

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
export const dynamic = "force-dynamic";
export const revalidate = 5;
