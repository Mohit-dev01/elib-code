import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  try {
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
    console.log("uploadResult", uploadResult);
    console.log("uploadBook", uploadBook);

    return res.json({ message: "Ok" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return next(createHttpError(400, `Error uploading file ${error}`));
  }
};
export { createBook };
