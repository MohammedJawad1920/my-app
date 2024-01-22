import StudentDetailsContainer from "@/components/StudentDetailsContainer";
import axios from "axios";

const fetchStudentData = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/api/students/get`);
  const students = await res.data.students;
  return students;
};
const StudentDetails = async () => {
  const data = await fetchStudentData();
  return <StudentDetailsContainer data={data} />;
};

export default StudentDetails;
