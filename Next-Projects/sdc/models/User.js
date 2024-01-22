import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: String,
  username: String,
  role: String,
  phoneNumber: String,
  password: String,
  emailVerified: Boolean,
  verificationToken: String,
  accessLocation: String,
});

const User = models.User || model("User", userSchema);

export default User;
