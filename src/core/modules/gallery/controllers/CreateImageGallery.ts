import { ErrorType } from "../../../middlewares/errorHandler";
import { ImageGallery } from "../models/ImageGallery";
import { NextFunction, Request, Response } from "express";

export const CreateImageGallery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data: { images: string[]} = req.body;
    const dataToInsert: { image: string }[] = [];

    if (!data.images || data.images.length === 0) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    data.images.map((image) => {
      return dataToInsert.push({ image });
    });

    const dbResult = await ImageGallery.insertMany(dataToInsert);

    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to create the image gallery. No result returned.",
      });
    }

    return res.status(200).json({
      message: "SUCCESS",
      body: {
        createdGallery: dbResult,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
