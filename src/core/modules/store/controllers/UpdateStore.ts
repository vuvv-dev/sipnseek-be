import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import _ from "lodash";
import { CoffeStore } from "../models/CoffeStore";

export const UpdateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id = (req.body._id as string) ?? null;
  const body = req.body;
  if (!id) {
    return res.status(400).json({ message: "Store ID is required." });
  }
  const updateData = _.omit(body, ["_id"]);
  try {
    const dbResult = await CoffeStore.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to update the store. No result returned.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        updatedStore: dbResult,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 500;
    next(error);
  }
};
