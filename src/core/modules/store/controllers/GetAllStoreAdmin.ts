import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { CoffeStore } from "../models/CoffeStore";

export const GetAllStoreForAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const totalStores = await CoffeStore.countDocuments();
      const stores = await CoffeStore.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("priceTag")
        .populate("purposeTag")
        .populate("images")
        .populate("menu")
        .exec();
  
      return res.status(200).json({
        message: "SUCCESS",
        body: {
          total: totalStores,
          currentPage: page,
          totalPages: Math.ceil(totalStores / limit),
          stores,
        },
      });
    } catch (error) {
      const err: ErrorType = new Error("Something went wrong");
      err.status = 400;
      next(err);
    }
  };
  