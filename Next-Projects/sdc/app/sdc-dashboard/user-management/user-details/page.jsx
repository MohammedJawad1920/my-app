import UserDetailsContainer from "@/components/UserDetailsContainer";
import axios from "axios";

const fetchUserData = async () => {
  const res = await axios.get(`/api/users`);
  const users = await res.data.users;
  const filteredUsers = users.filter(
    (row) => row.emailVerified === true && row.accessLocation === "Library"
  );
  return filteredUsers;
};
const UserDetails = async () => {
  const filteredUsers = await fetchUserData();
  return <UserDetailsContainer data={filteredUsers} />;
};

export default UserDetails;
