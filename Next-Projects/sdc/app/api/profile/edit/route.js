import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { _id, username, role, phoneNumber, password } = body;

  try {
    const user = await User.findOne({ _id });

    // Check if the username already exists
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist && username !== user.username) {
      return NextResponse.json(
        { msg: "Username already exists" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (username) user.username = username;
    if (hashPassword) user.password = hashPassword;
    if (role) user.role = role;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    return NextResponse.json(
      { msg: "User updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error upadating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
