import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { ImageGallery } from "../models/ImageGallery";
export const GetImageGalleryByStore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const storeId = req.params.storeId;
    const imageGallery = await ImageGallery.find({ store: storeId });

    if (!imageGallery) {
      return res.status(400).json({
        message: "Failed to get the image gallery. No result returned.",
      });
    }

    res.status(200).json({
      message: "Successfully get the image gallery.",
      data: imageGallery,
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
