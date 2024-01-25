import UserDetailsContainer from "@/components/UserDetailsContainer";

const fetchUserData = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
      cache: "no-store",
    });
    const data = await res.json();
    const users = data.users;
    return users;
  } catch (error) {
    console.error("Error:", error);
  }
};
const UserDetails = async () => {
  const data = await fetchUserData();
  const filteredUsers = data?.filter(
    (row) => row.emailVerified === true && row.accessLocation === "Library"
  );

  return <UserDetailsContainer data={filteredUsers} />;
};

export const dynamic = "force-dynamic";

export default UserDetails;
