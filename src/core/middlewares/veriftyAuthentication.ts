import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../../external/libs/Jwt";
import { NextFunction, Request, Response } from "express";
import { ErrorType } from "./errorHandler";

export interface CustomRequest extends Request {
    user?: JwtPayloadOptions
}

export const verifyAuthentication = async (
    req: CustomRequest,
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
        const decoded = jwtDecode<JwtPayloadOptions>(token);
        if (!decoded) {
            return res.status(401).json({
              error: {
                message: "Unauthorized",
              },
            });
        }
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({
                error: {
                    message: "Token has expired",
                },
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
}