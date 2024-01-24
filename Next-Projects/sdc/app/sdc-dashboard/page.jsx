import DashboardContainer from "@/components/DashboardContainer";

export const dynamic = "force-dynamic";
export const revalidate = 5;

const fetchData = async () => {
  try {
    const requests = await Promise.all([
      fetch(`${process.env.BASE_URL}/api/books/get`, {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
      fetch(`${process.env.BASE_URL}/api/students/get`, {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
      fetch(`${process.env.BASE_URL}/api/rental/get`, {
        headers: {
          "Cache-Control": "no-store",
        },
      }),
    ]);

    const responses = await Promise.all(requests);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Dashboard = async () => {
  const data = await fetchData();
  const booksData = data[0]?.books || [];
  const studentsData = data[1]?.students || [];
  const rentalsData = data[2]?.rentals || [];

  return (
    <DashboardContainer
      booksData={booksData}
      studentsData={studentsData}
      rentalsData={rentalsData}
    />
  );
};

export default Dashboard;
