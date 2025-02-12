import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { CoffeStore } from "../models/CoffeStore";

export const GetStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = (req.query.id as string) ?? null;
    if (!id) {
      return res.status(400).json({ message: "Store ID is required." });
    }
    if (id) {
      const dbResult = await CoffeStore.findById(id)
        .populate("priceTag")
        .populate("purposeTag")
        .populate("images")
        .populate("menu")
        .exec();

      if (!dbResult) {
        return res.status(400).json({
          message: "Failed to get the store. No result returned.",
        });
      }
      return res.status(200).json({
        message: "SUCCESS",
        body: {
          store: dbResult,
        },
      });
    }
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
