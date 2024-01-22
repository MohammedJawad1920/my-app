import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
  studentName: String,
  studentId: String,
  name: String,
  batchName: String,
  address: String,
  phoneNumber: String,
});

const Student = models.Student || model("Student", studentSchema);

export default Student;
