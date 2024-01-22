"use client";

import { useState, useEffect } from "react";
import UserDetailsContainer from "@/components/UserDetailsContainer";
import axios from "axios";

const UserDetails = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users`);
        const users = res.data.users;
        const filteredUsers = users.filter(
          (row) =>
            row.emailVerified === true && row.accessLocation === "Library"
        );
        setFilteredUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return <UserDetailsContainer data={filteredUsers} />;
};

export default UserDetails;
