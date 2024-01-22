import { connectToDB } from "@/libs/connectToDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const { studentId } = await req.json();
  console.log(studentId);
  try {
    if (!studentId) {
      return NextResponse.json({ msg: "Invalid sudent ID" }, { status: 400 });
    }

    const result = await Student.deleteOne({ studentId });

    if (!result) {
      return NextResponse.json({ msg: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ msg: "Deleted Succesfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
