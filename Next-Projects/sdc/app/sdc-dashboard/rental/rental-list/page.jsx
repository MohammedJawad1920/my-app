"use client";
import React, { useState, useEffect } from "react";
import RentalListContainer from "@/components/RentalListContainer";
import axios from "axios";

const RentalList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const res = await axios.get(`/api/rental/get`);
        setData(res.data.rentals);
      } catch (error) {
        console.error("Error fetching rental data:", error);
        // Handle error, show a message, etc.
      }
    };

    fetchRentalData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return <RentalListContainer data={data} />;
};

export default RentalList;
