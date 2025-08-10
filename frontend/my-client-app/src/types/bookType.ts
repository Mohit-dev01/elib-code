export interface Book {
  _id: string;
  title: string;
  author: Author;
  description: string;
  coverImage: string;
  genre: string;
  file: string;
}

export interface Author {
  name: string;
}
