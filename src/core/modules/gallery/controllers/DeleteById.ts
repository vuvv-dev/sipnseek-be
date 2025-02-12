import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ImageGallery } from "../models/ImageGallery";

export const DeleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = (req.body.id as string) ?? null;
    if (!id) {
      return res.status(400).json({ message: "Image ID is required." });
    }
    const dbResult = await ImageGallery.findByIdAndDelete(id);

    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to delete the image. No result returned.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        deletedImage: dbResult,
      },
    });
  } catch (err) {
    const error: ErrorType = new Error("Something went wrong");
    error.status = 500;
    next(error);
  }
};
