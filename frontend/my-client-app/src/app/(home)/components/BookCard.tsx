import { Book } from "@/types/bookType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <>
      <div className="flex border p-4 shadow-gray-500 rounded-md gap-5 border-gray-300 ">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={130}
          height={200}
          className="object-cover"
        />
        <div>
          <div className="text-orange-500 text-xl line-clamp-2">
            {book.title}
          </div>
          <div className="text-orange-700 text-xl mb-5">{book.author.name}</div>
          <Link
            href={`/book/${book._id}`}
            className="p-1 border rounded-md border-orange-700 text-orange-500 "
          >
            Read more
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
