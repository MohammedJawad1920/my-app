import User from "@/models/User";
import { connectToDB } from "@/libs/connectToDB";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sendVerificationEmail from "@/libs/sendVerificationEmail";

connectToDB();
export async function POST(req) {
  const verificationToken = crypto.randomBytes(16).toString("hex");

  const body = await req.json();
  const { email, username, role, phoneNumber, accessLocation } = body;
  const user = await User.find({ accessLocation });

  try {
    // Validate input data
    if (!email || !username || !role || !phoneNumber || !accessLocation) {
      return NextResponse.json({ msg: "Invalid fields" }, { status: 400 });
    }

    // Check if the user already exists
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }

    const isEmailFound = await sendVerificationEmail(email, verificationToken);

    if (!isEmailFound) {
      return NextResponse.json({ msg: "Email not found" }, { status: 404 });
    }

    try {
      const newUser = new User({
        email,
        username,
        role,
        phoneNumber,
        emailVerified: false,
        verificationToken,
        accessLocation,
      });
      await newUser.save();

      return NextResponse.json(
        { msg: "User created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
