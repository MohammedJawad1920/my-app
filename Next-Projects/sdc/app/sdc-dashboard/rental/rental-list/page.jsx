import RentalListContainer from "@/components/RentalListContainer";

const fetchRentalData = async () => {
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

export const dynamic = "force-dynamic";
export default rentalList;
