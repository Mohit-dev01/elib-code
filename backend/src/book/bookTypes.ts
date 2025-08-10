import { User } from "../user/userTypes";

export interface book {
  _id: string;
  title: string;
  description: string;
  author: User;
  coverImage: string;
  genre: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}
