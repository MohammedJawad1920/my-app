import RentalListContainer from "@/components/RentalListContainer";
import { unstable_noStore } from "next/cache";

const fetchRentalData = async () => {
  unstable_noStore();
  const res = await fetch(`${process.env.BASE_URL}/api/rental/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  const rentals = data.rentals;
  return rentals;
};
const rentalList = async () => {
  const data = await fetchRentalData();
  return <RentalListContainer data={data} />;
};

export default rentalList;
