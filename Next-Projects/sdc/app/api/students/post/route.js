import { connectToDB } from "@/libs/connectToDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const {
    studentName,
    state,
    district,
    street,
    pin,
    studentId,
    phoneNumber,
    batchName,
  } = body;

  const isStudentExist = await Student.findOne({ studentName, studentId });
  if (isStudentExist) {
    return NextResponse.json(
      { msg: "Student already registered" },
      { status: 409 }
    );
  }

  if (
    !studentName ||
    !state ||
    !district ||
    !street ||
    !pin ||
    !studentId ||
    !phoneNumber ||
    !batchName
  ) {
    return NextResponse.json({ msg: "Invalid format" }, { status: 409 });
  }
  try {
    const address = `${state}, ${district}, ${street}, ${pin}`;
    const newStudent = new Student({
      studentName,
      address,
      studentId,
      phoneNumber,
      batchName,
    });
    await newStudent.save();
    return NextResponse.json(
      { msg: "Student Registered succesfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
