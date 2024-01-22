import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { _id } = body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return NextResponse.json({ msg: "User do not exist" }, { status: 409 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
