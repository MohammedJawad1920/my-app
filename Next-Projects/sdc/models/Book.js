import { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
  bookName: String,
  author: String,
  category: String,
  bookId: String,
  language: String,
  status: String,
  price: String,
});

const Book = models.Book || model("Book", bookSchema);

export default Book;
