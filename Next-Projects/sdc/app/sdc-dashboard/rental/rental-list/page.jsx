import RentalListContainer from "@/components/RentalListContainer";
import axios from "axios";

const fetchRentalData = async () => {
  const res = await axios.get(`/api/rental/get`);
  const rentals = await res.data.rentals;
  return rentals;
};
const rentalList = async () => {
  const data = await fetchRentalData();
  return <RentalListContainer data={data} />;
};

export default rentalList;
