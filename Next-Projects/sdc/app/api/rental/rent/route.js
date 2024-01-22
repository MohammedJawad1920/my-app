import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import Rental from "@/models/Rental";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { bookId, bookName, studentId, studentName } = body;
  const rentedDate = new Date().toISOString().split("T")[0];

  try {
    if (!bookId || !bookName || !studentId || !studentName) {
      return NextResponse.json({ msg: "Invalid Format" }, { status: 409 });
    }
    const newrental = new Rental({
      bookId,
      bookName,
      studentId,
      studentName,
      rentedDate,
      recievedDate: "Not Recieved",
    });

    await newrental.save();
    const book = await Book.findOne({ bookId });
    book.status = "Rented";
    await book.save();
    return NextResponse.json(
      { msg: "Book Renetd Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
