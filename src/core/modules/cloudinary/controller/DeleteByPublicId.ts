import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DeleteByPublicId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const publicId = req.query.publicId as string;
    if (!publicId) {
      return res.status(400).json({ message: "Public ID is required." });
    }
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      return res.status(500).json({ error: "Failed to delete image", result });
    }

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(err);
  }
};
