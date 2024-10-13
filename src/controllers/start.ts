import { NextFunction, Request, Response } from "express"

export const start = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "P-Clinic Medical Service Report Form Api",
        })
    } catch (error) {
        next(error);
    }
}