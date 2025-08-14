"use client";
import { Book } from "@/types/bookType";
import BookCard from "./BookCard";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {books.map((book) => (
        <div key={book._id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
