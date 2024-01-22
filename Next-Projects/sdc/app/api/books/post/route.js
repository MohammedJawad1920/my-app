import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { bookName, author, category, bookId, language, status, price } = body;

  const isBookExist = await Book.findOne({ bookName, bookId });
  if (isBookExist) {
    return NextResponse.json(
      { msg: "Book already registered" },
      { status: 409 }
    );
  }

  try {
    const newBook = new Book({
      bookName,
      author,
      category,
      bookId,
      language,
      price,
      status,
    });
    await newBook.save();
    return NextResponse.json(
      { succes: true, msg: "Book Registered succesfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
