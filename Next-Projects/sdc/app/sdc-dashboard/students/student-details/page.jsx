import StudentDetailsContainer from "@/components/StudentDetailsContainer";
import fetch from "node-fetch";
export const dynamic = "force-dynamic";

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

export default StudentDetails;
