import { connectToDB } from "@/libs/connectToDB";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const students = await Student.find({});
    return NextResponse.json({ students }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
