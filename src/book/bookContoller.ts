import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import BookModel from "./bookModel";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  try {
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
      format: coverImageMimetype || "jdg",
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
      author: "689626bf805a5ba9b903d6e1",
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
export { createBook };
