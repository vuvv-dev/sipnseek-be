import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { Echocardiography } from "../models/Echocardiography";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";

export const createNewEchocardiography = async (
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
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { serviceOrderedId } = req.body;
    const foundReport = await Echocardiography.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    if (foundReport) {
      return res.status(400).json({
        message: "Echocardiography already exists",
        body: {
          result: foundReport,
        },
      });
    }

    const reqBody = req.body;
    const result = await Echocardiography.create(req.body);
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
export const getEchocardiographyByServiceId = async (
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
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { serviceOrderedId } = req.query;
    const foundReport = await Echocardiography.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    return res.status(200).json({
      message: "Echocardiography fetched successfully",
      body: {
        result: foundReport,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};

export const updateEchocardiographyByServiceId = async (
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
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { serviceOrderedId } = req.body;
    const updateData = _.omit(req.body, ["serviceOrderedId"]);
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields to update.",
      });
    }
    const result = await Echocardiography.findOneAndUpdate(
      { serviceOrderedId: serviceOrderedId },
      { $set: updateData },
      { new: true }
    );
    return res.status(200).json({
      message: "Electrocardiogram updated successfully",
      body: {
        result: result,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
