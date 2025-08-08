import mongoose from "mongoose";
import { User } from "./userTypes";

const { Schema } = mongoose;

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
