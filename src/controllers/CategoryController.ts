import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";
import { Category } from "../models/Category";
import { CustomRequest } from "../middlewares/veriftyAuthentication";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: {
          message: "Unauthorized",
        },
      });
    }

    const token = authorization.replace("Bearer ", "");
    const role = jwtDecode<JwtPayloadOptions>(token).role;
    if (role != ROLES.ADMIN) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const category = await Category.create(req.body);

    return res.status(200).json({
      message: "Category created successfully",
      body: {
        id: category._id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: {
          message: "Unauthorized",
        },
      });
    }

    const token = authorization.replace("Bearer ", "");
    const role = jwtDecode<JwtPayloadOptions>(token).role;
    if (role != ROLES.ADMIN) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Category updated successfully",
      body: {
        id: category?._id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

export const getAllCategory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;
    if (role != ROLES.ADMIN) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const categories = await Category.find({ $or: [{ status: 2 }, { status: 1 }] });

    return res.status(200).json({
      message: "Categories fetched successfully",
      body: {
        result: categories,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

// for guest
export const getAllActiveCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const categories = await Category.find({ status: 2 });

    return res.status(200).json({
      message: "Categories fetched successfully",
      body: {
        result: categories,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}


export const deleteCategory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;
    if (role != ROLES.ADMIN) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { status: 0 },
      { new: true }
    );

    return res.status(200).json({
      message: "Category deleted successfully",
      body: {
        id: category?._id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

