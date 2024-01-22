import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import Rental from "@/models/Rental";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { bookId } = body;
  try {
    if (!bookId) {
      return NextResponse.json({ msg: "Book ID is invalid" });
    }
    const book = await Book.findOne({ bookId });
    if (!book) {
      return NextResponse.json(
        { msg: "This Book do not exist" },
        { status: 401 }
      );
    }
    const rental = await Rental.findOne({
      bookId,
      recievedDate: "Not Recieved",
    });
    return NextResponse.json({ book, rental }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
