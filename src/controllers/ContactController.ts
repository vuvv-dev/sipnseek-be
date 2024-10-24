import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";
import { Contact } from "../models/Contact";

export const createAContact = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const contact = await Contact.create(req.body);

        return res.status(200).json({
            message: "Contact created successfully",
            body: {
                id: contact._id,
            },
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
};

export const updateContact = async (
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

        const contact = await Contact.findOneAndUpdate(
            { _id: req.body.id },
            {
                status: req.body.status,
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Contact updated successfully",
            body: {
                id: contact?._id,
            },
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
}

export const getAllContact = async (
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

        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const skip = (page - 1) * limit;
        let filter: any = {
            $and: [{ $or: [{ status: 2 }, { status: 1 }] }]
        }

        let search = req.query.search && (req.query.search as string).replace(/^"|"$/g, '');
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filter.$and.push({
                $or:
                    [
                        { fullName: searchRegex },
                        { emailOrPhone: searchRegex },
                    ]
            })
        }

        const contacts = await Contact.find(filter).select("fullName gender age emailOrPhone status").skip(skip).limit(limit);

        const totalContact = await Contact.countDocuments(filter);
        const totalPage = Math.ceil(totalContact / limit);

        return res.status(200).json({
            message: "Contacts fetched successfully",
            body: {
                result: contacts,
                totalPages: totalPage
            },
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
}

export const getContactById = async (
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

        const contact = await Contact.findOne({
            _id: req.params.id,
        });

        return res.status(200).json({
            message: "Contact fetched successfully",
            body: {
                result: contact,
            },
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
}

export const deleteContact = async (
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

        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id },
            { status: 0 },
            { new: true }
        );

        return res.status(200).json({
            message: "Contact deleted successfully",
            body: {
                id: contact?._id,
            },
        });
    } catch (error) {
        const err: ErrorType = new Error("Something went wrong");
        err.status = 400;
        next(error);
    }
}

