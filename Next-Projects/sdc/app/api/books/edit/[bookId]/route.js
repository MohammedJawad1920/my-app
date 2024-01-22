import { connectToDB } from "@/libs/connectToDB";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  const body = await req.json();
  const { prevId, bookName, author, category, bookId, language, price } = body;

  try {
    const book = await Book.findOne({ bookId: prevId });

    // Check if the bookId already exists
    const isBookIdExist = await Book.findOne({ bookId });
    if (isBookIdExist && bookId !== prevId) {
      return NextResponse.json(
        { msg: "Book ID already exists" },
        { status: 409 }
      );
    }

    if (bookName) book.bookName = bookName;
    if (author) book.author = author;
    if (category) book.category = category;
    if (bookId) book.bookId = bookId;
    if (language) book.language = language;
    if (price) book.price = price;

    await book.save();

    return NextResponse.json(
      { msg: "Book updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error upadating :", error);
    return NextResponse.json({ error: "Failed to update " }, { status: 500 });
  }
}

export async function GET(req) {
  const bookId = req.url.split(`${process.env.BASE_URL}/api/books/edit/`);
  try {
    const book = await Book.find({ bookId });
    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
