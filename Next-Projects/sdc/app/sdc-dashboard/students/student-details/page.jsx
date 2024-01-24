import StudentDetailsContainer from "@/components/StudentDetailsContainer";

export const dynamic = "force-dynamic";
export const revalidate = 5;

const fetchStudentData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/students/get`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const data = await res.json();
  const students = data.students;
  return students;
};
const StudentDetails = async () => {
  const data = await fetchStudentData();
  return <StudentDetailsContainer data={data} />;
};

export default StudentDetails;
