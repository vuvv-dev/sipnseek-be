import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import _ from "lodash";
import { CoffeStore } from "../models/CoffeStore";

export const CreateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = req.body;
    const dbResult = await CoffeStore.create(data);

    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to create the store. No result returned.",
      });
    }

    return res.status(200).json({
      message: "SUCCESS",
      body: {
        createdStore: dbResult,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
