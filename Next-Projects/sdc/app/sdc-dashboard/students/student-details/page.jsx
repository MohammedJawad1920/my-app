import StudentDetailsContainer from "@/components/StudentDetailsContainer";

const fetchStudentData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/students/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  const students = data.students;
  return students;
};
const StudentDetails = async () => {
  const data = await fetchStudentData();
  return <StudentDetailsContainer data={data} />;
};
export const dynamic = "force-dynamic";

export default StudentDetails;
