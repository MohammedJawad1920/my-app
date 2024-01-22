import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;
    console.log("token:", token);

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log("User detail: ", user);

    user.emailVerified = true;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
