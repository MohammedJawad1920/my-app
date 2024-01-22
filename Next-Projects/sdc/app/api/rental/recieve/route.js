import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import Rental from "@/models/Rental";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { bookId, studentId } = body;

  const recievedDate = new Date().toISOString().split("T")[0];

  try {
    if (!bookId) {
      return NextResponse.json({ msg: "Book ID is not provide" });
    }
    if (!studentId) {
      return NextResponse.json({ msg: "Student ID is not provide" });
    }
    const rental = await Rental.findOne({
      bookId,
      studentId,
      recievedDate: "Not Recieved",
    });

    rental.recievedDate = recievedDate;
    await rental.save();

    const book = await Book.findOne({ bookId });
    book.status = "Available";
    await book.save();
    return NextResponse.json(
      { msg: "Book Recieved Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
