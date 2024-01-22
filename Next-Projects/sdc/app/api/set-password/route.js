import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(req) {
  try {
    const body = await req.json();
    const { password, token } = body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.password = hashPassword;
    await user.save();

    return NextResponse.json({
      message: "Password created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
