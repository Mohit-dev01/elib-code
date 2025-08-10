"use client";
import { Book } from "@/types/bookType";
import BookCard from "./BookCard";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {books.map((book) => (
        <div key={book._id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
