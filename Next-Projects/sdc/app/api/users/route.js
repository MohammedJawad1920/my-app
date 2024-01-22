import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectToDB();
export async function GET() {
  try {
    const users = await User.find({});

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  const { _id } = await req.json();
  console.log(_id);
  try {
    if (!_id) {
      return NextResponse.json({ msg: "Invalid id" }, { status: 400 });
    }

    const result = await User.deleteOne({ _id });

    if (!result) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ msg: "Deleted Succesfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
