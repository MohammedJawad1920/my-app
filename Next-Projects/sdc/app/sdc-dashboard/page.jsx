import DashboardContainer from "@/components/DashboardContainer";
import axios from "axios";
const fetchData = async () => {
  try {
    const requests = await Promise.all([
      axios.get(`/api/books/get`),
      axios.get(`/api/students/get`),
      axios.get(`/api/rental/get`),
    ]);

    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data);
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
