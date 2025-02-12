import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { ImageGallery } from "../models/ImageGallery";
export const GetAllImageGallery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const dbResult = await ImageGallery.find({});
    return res.status(200).json({
      message: "SUCCESS",
      body: {
        imageGallery: dbResult,
        images: dbResult.map((image, index) => ({
          original: image.image,
          index: index,
        })),
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
