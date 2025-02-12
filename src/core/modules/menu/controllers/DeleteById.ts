import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { Menu } from "../models/Menu";

export const DeleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = (req.body.id as string) ?? null;
    if (!id) {
      return res.status(400).json({ message: "Menu ID is required." });
    }
    const dbResult = await Menu.findByIdAndDelete(id);

    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to delete the menu. No result returned.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        deletedMenu: dbResult,
      },
    });
  } catch (err) {
    const error: ErrorType = new Error("Something went wrong");
    error.status = 500;
    next(error);
  }
};
