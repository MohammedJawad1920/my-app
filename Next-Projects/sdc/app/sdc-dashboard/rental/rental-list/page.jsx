import RentalListContainer from "@/components/RentalListContainer";

export const dynamic = "force-dynamic";
export const revalidate = 5;

const fetchRentalData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/rental/get`, {
    headers: {
      "Cache-Control": "no-store",
    },
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
