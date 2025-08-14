import { Book } from "@/types/bookType";
import Image from "next/image";
import React from "react";
import DownloadReadMore from "../../components/DownloadReadMore";

const SingleBookPage = async ({
  params,
}: {
  params: {
    bookId: string;
  };
}) => {
  let book: Book | null;
  try {
    const { bookId } = await params;
    const response = await fetch(`${process.env.BACKEND_URL}/books/${bookId}`);
    if (!response.ok) {
      throw new Error("Error fetching book");
    }
    book = await response.json();
  } catch (error) {
    throw new Error(`Error fetching book ${error}`);
  }

  if (!book) {
    throw new Error("Book not found");
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between py-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-xl">by {book.author.name}</p>
          <p>{book.description}</p>
          <DownloadReadMore link={book.file} />
        </div>
        <Image
          src={book.coverImage}
          alt={book.author.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "20rem", height: "23rem" }}
          className="roundem-md"
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
