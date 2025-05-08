import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserDocument>("User", userSchema);
