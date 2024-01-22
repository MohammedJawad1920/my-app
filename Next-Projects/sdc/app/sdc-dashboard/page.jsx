"use client";
import { useState, useEffect } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    booksData: [],
    studentsData: [],
    rentalsData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await Promise.all([
          axios.get(`/api/books/get`),
          axios.get(`/api/students/get`),
          axios.get(`/api/rental/get`),
        ]);

        const responses = await Promise.all(requests);
        const newData = responses.map((response) => response.data);

        setData({
          booksData: newData[0]?.books || [],
          studentsData: newData[1]?.students || [],
          rentalsData: newData[2]?.rentals || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <DashboardContainer
      booksData={data.booksData}
      studentsData={data.studentsData}
      rentalsData={data.rentalsData}
    />
  );
};

export default Dashboard;
