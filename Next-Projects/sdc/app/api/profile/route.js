import { connectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json(
      { error: "Token not provided", success: false },
      { status: 400 }
    );
  }
  try {
    const { payload } = jwt.decode(token, { complete: true });

    if (payload) {
      const { email } = payload;
      const user = await User.findOne({ email });

      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid token", success: false },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return NextResponse.json({ error: err, success: false }, { status: 500 });
  }
}
