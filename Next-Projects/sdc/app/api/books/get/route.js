import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const books = await Book.find({});
    const response = NextResponse.json(
      { succes: true, books },
      { status: 201 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
