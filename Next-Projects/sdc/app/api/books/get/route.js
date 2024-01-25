import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const books = await Book.find({});

    return NextResponse.json({ succes: true, books }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
