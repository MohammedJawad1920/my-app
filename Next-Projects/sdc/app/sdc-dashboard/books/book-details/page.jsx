"use client";
import React, { useState, useEffect } from "react";
import BookDetailsContainer from "@/components/BookDetailsContainer";
import axios from "axios";

const BookDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(`/api/books/get`);
        setData(res.data.books);
      } catch (error) {
        console.error("Error fetching book data:", error);
        // Handle error, show a message, etc.
      }
    };

    fetchBookData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return <BookDetailsContainer data={data} />;
};

export default BookDetails;
