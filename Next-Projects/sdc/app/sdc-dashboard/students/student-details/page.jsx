"use client";
import React, { useState, useEffect } from "react";
import StudentDetailsContainer from "@/components/StudentDetailsContainer";
import axios from "axios";

const StudentDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`/api/students/get`);
        setData(res.data.students);
      } catch (error) {
        console.error("Error fetching student data:", error);
        // Handle error, show a message, etc.
      }
    };

    fetchStudentData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return <StudentDetailsContainer data={data} />;
};

export default StudentDetails;
