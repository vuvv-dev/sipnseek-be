import { NextFunction, Request, Response } from "express";

export const start = async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "FROM API SERVER_SIPNSEEK!",
        })
    } catch (error) {
        next(error);
    }
}