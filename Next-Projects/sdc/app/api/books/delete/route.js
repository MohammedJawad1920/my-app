import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const { bookId } = await req.json();
  console.log(bookId);
  try {
    if (!bookId) {
      return NextResponse.json({ msg: "Invalid sudent ID" }, { status: 400 });
    }

    const result = await Book.deleteOne({ bookId: bookId });

    if (!result) {
      return NextResponse.json({ msg: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ msg: "Deleted Succesfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Sever Error" }, { status: 500 });
  }
}
