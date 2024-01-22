import { connectToDB } from "@/libs/connectToDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { studentId } = body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return NextResponse.json(
        { msg: "This student do not exist" },
        { status: 401 }
      );
    }
    return NextResponse.json({ student }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
