import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import BookModel from "./bookModel";
import fs from "node:fs";
import { AuthenticateRequest } from "../middleware/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  try {
    const _req = req as AuthenticateRequest;
    const { title, genre } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimetype = files.coverImage
      ? files.coverImage[0]?.mimetype.split("/").at(-1)
      : "";
    const fileName = files.coverImage ? files.coverImage[0]?.filename : "";
    const filePath = path.resolve(
      __dirname,
      "../../public/uploads",
      fileName as string
    );
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id: fileName || "",
      folder: "book_covers",
      format: coverImageMimetype || "jpg",
    });

    const bookFileName = files.file ? files.file[0]?.filename : "";

    const bookFilePath = path.resolve(
      __dirname,
      "../../public/uploads",
      bookFileName as string
    );

    const uploadBook = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName || "",
      folder: "book_pdf",
      format: "pdf",
    });

    const newBook = await BookModel.create({
      title,
      genre,
      author: _req.userId,
      coverImage: uploadResult.secure_url,
      file: uploadBook.secure_url,
    });

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);
    return res.json({ id: newBook._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return next(createHttpError(400, `Error uploading file ${error}`));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  let completeCoverImage = "";
  if (files.coverImage) {
    const fileName = files.coverImage ? files.coverImage[0]?.filename : "";
    const coverImageMimetype = files.coverImage
      ? files.coverImage[0]?.mimetype.split("/").at(-1)
      : "";
    const imagePath = path.resolve(
      __dirname,
      "../../public/uploads",
      fileName as string
    );

    completeCoverImage = fileName as string;
    const uploadImage = await cloudinary.uploader.upload(imagePath, {
      public_id: completeCoverImage,
      folder: "book_covers",
      format: coverImageMimetype || "jpg",
    });

    completeCoverImage = uploadImage.secure_url;

    await fs.promises.unlink(imagePath);
  }

  let completeFileName = "";
  if (files.file) {
    const bookFileName = files.file ? files.file[0]?.filename : "";
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/uploads",
      bookFileName as string
    );

    completeFileName = bookFileName as string;
    const uploadBook = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: completeFileName,
      folder: "book_pdf",
      format: "pdf",
    });
    completeFileName = uploadBook.secure_url;
    await fs.promises.unlink(bookFilePath);
  }
  const bookId = req.params.bookId;

  try {
    const book = await BookModel.findOne({
      _id: bookId,
    });
    if (!book) {
      return next(createHttpError(404, "Book do not exist"));
    }

    const _req = req as AuthenticateRequest;

    if (book.author._id.toString() !== _req.userId) {
      return next(createHttpError(403, "You can not update a book"));
    }

    const updatedBook = await BookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        title: title,
        genre: genre,
        coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
        file: completeFileName ? completeFileName : book.file,
      },
      {
        new: true,
      }
    );

    return res.json({
      updatedBook: updatedBook,
    });
  } catch (error) {
    return next(createHttpError(400, `Error updating book ${error}`));
  }
};

const listBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookModel.find();
    return res.json({
      books: books,
    });
  } catch (error) {
    return next(createHttpError(500, "Error getting books" + error));
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const book = await BookModel.findOne({
      _id: bookId,
    });
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    return res.json({
      book: book,
    });
  } catch (error) {
    return next(createHttpError(500, "Book find error" + error));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  const book = await BookModel.findOne({
    _id: bookId,
  });
  if (!book) {
    return next(createHttpError(404, "Book not found"));
  }

  const _req = req as AuthenticateRequest;

  if (book.author._id.toString() !== _req.userId) {
    return next(createHttpError(403, "You do not have access"));
  }

  const bookCoverImage = book.coverImage.split("/").at(-1);
  const public_id_bookCoverImage = bookCoverImage?.split(".").at(-2);

  const public_id_bookFilePdf = book.file.split("/").at(-1);

  try {
    await cloudinary.uploader.destroy(public_id_bookCoverImage as string);
    await cloudinary.uploader.destroy(public_id_bookFilePdf as string, {
      resource_type: "raw",
    });
    await BookModel.deleteOne({
      _id: bookId,
    });

    return res.sendStatus(204);
  } catch (error) {
    return next(createHttpError(500, "Error deleting book" + error));
  }

  return res.json({});
};
export { createBook, updateBook, listBooks, getSingleBook, deleteBook };
