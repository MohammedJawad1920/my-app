import StudentDetailsContainer from "@/components/StudentDetailsContainer";
import fetch from "node-fetch";

const fetchStudentData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/students/get`, {
    next: { revalidate: 5 },
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
