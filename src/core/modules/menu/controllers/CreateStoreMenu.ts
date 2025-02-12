import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { Menu } from "../models/Menu";

export const CreateStoreMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data: { images: string[] } = req.body;
    const dataToInsert: { image: string }[] = [];

    if (!data.images || data.images.length === 0) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    data.images.map((item) => {
      return dataToInsert.push({ image: item });
    });
    const dataResult = await Menu.insertMany(dataToInsert);
    if (!dataResult) {
      return res.status(400).json({
        message: "Failed to create the menu. No result returned.",
      });
    }
    return res.status(200).json({
      message: "SUCCESS",
      body: {
        createdMenu: dataResult,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
