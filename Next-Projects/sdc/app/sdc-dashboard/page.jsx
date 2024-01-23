import DashboardContainer from "@/components/DashboardContainer";
import axios from "axios";
const fetchData = async () => {
  try {
    const requests = await Promise.all([
      axios.get(`${process.env.BASE_URL}/api/books/get`, {
        next: { revalidate: 5 },
      }),
      axios.get(`${process.env.BASE_URL}/api/students/get`),
      axios.get(`${process.env.BASE_URL}/api/rental/get`),
    ]);

    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const Dashboard = async () => {
  return (
    <DashboardContainer
      booksData={booksData}
      studentsData={studentsData}
      rentalsData={rentalsData}
    />
  );
};

export default Dashboard;
