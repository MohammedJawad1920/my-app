import { connectToDB } from "@/libs/connectToDB";
import Rental from "@/models/Rental";
import { NextResponse } from "next/server";

connectToDB();
export async function GET() {
  try {
    const rentals = await Rental.find({});
    return NextResponse.json({ rentals }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server Error" || err }, { status: 500 });
  }
}
