import { Book } from "@/types/bookType";
import Banner from "./components/Banner";
import BookList from "./components/BookList";

export default async function Home() {
  let books: Book[] | null;
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/books`);
    if (!response.ok) {
      throw new Error("Error fetching Books");
    }
    books = await response.json();
    console.log("books", books);
  } catch (error) {
    console.log("error", error);
    throw new Error(`Error fetching Books ${error}`);
  }
  if (!books) {
    throw new Error("Book not found");
  }
  return (
    <>
      <Banner />
      <BookList books={books} />
    </>
  );
}
