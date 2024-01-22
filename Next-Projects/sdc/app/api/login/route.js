import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();
export async function POST(request) {
  const body = await request.json();

  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ msg: "invalid fields" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ username });
    const meeladFestUser = user?.accessLocation === "Meelad Fest";
    const attendanceUser = user?.accessLocation === "Attendance";

    if (!user) {
      return NextResponse.json(
        { msg: "Username is not available" },
        { status: 400 }
      );
    }

    console.log("Username:", user);

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ msg: "Invalid Password" }, { status: 401 });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        accessLocation: user?.accessLocation,
      },
      secretKey
    );

    let tokens = {};

    if (attendanceUser) {
      tokens.staffToken = token;
    } else if (meeladFestUser) {
      tokens.festToken = token;
    } else {
      tokens.libraryToken = token;
    }

    return NextResponse.json({ tokens }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server Error", success: false },
      { status: 500 }
    );
  }
}
