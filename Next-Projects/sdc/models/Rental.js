import { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
  bookId: String,
  bookName: String,
  studentId: String,
  studentName: String,
  rentedDate: String,
  recievedDate: String,
});

const Rental = models.rental || model("rental", bookSchema);

export default Rental;
