import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role?: string;
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.model<UserDocument>("User", userSchema);