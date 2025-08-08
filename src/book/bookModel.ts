import mongoose from "mongoose";
import { book } from "./bookTypes";
const { Schema } = mongoose;

const bookSchema = new Schema<book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model<book>("Book", bookSchema);
export default BookModel;
