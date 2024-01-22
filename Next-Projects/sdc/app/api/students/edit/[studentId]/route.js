import { connectToDB } from "@/libs/connectToDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const {
    prevId,
    studentName,
    state,
    district,
    street,
    pin,
    studentId,
    phoneNumber,
    batchName,
  } = body;

  try {
    const student = await Student.findOne({ studentId: prevId });

    // Check if the studentID already exists
    const isStudentIdExist = await Student.findOne({ studentId });
    if (isStudentIdExist && studentId !== prevId) {
      return NextResponse.json(
        { msg: "Student ID already exists" },
        { status: 409 }
      );
    }

    const address = `${state}, ${district}, ${street}, ${pin}`;

    if (studentName) student.studentName = studentName;
    if (address) student.address = address;
    if (studentId) student.studentId = studentId;
    if (batchName) student.batchName = batchName;
    if (phoneNumber) student.phoneNumber = phoneNumber;

    await student.save();

    return NextResponse.json(
      { msg: "Student updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error upadating :", error);
    return NextResponse.json({ error: "Failed to update " }, { status: 500 });
  }
}

export async function GET(req) {
  const studentId = req.url.split(`${process.env.BASE_URL}/api/students/edit/`);
  try {
    const student = await Student.find({ studentId });
    return NextResponse.json({ student }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
