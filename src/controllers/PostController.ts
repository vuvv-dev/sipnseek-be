import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";
import { Post } from "../models/Post";

export const createPost = async (
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
    const sub = jwtDecode<JwtPayloadOptions>(token).sub;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.body.created_by = sub;
    const post = await Post.create(req.body);

    return res.status(200).json({
      message: "Post created successfully",
      body: {
        id: post._id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};

export const updatePost = async (
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
    const sub = jwtDecode<JwtPayloadOptions>(token).sub;
    req.body.updated_by = sub;
    let post;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    } else if (role == ROLES.STAFF || role == ROLES.DOCTOR) {
      post = await Post.findOneAndUpdate(
        { _id: req.body.id, created_by: sub },
        req.body,
        { new: true }
      );
    } else if (role == ROLES.ADMIN) {
      post = await Post.findOneAndUpdate(
        { _id: req.body.id },
        req.body,
        { new: true }
      );
    }
    return res.status(200).json({
      message: "Post updated successfully",
      body: {
        id: post?._id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

export const getAllPost = async (
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
    const sub = jwtDecode<JwtPayloadOptions>(token).sub;
    if (role == ROLES.USER) {
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
            { title: searchRegex },
            { short_desc: searchRegex },
          ]
      })
    }
    let posts
    if (role == ROLES.ADMIN) {
      posts = await Post.find(filter).select('_id slug position title view status createdAt').skip(skip).limit(limit).populate({
        path: 'categories',  // populate categories
        match: { status: 2 }, // only categories with status 2
        select: 'name _id' // specify the fields you want to retrieve
      });
    } else {
      filter.$and.push({ created_by: sub });
      posts = await Post.find(filter).select('_id slug position title view status createdAt').skip(skip).limit(limit).populate({
        path: 'categories',  // populate categories
        match: { status: 2 }, // only categories with status 2
        select: 'name _id' // specify the fields you want to retrieve
      });
    }

    const totalPost = await Post.countDocuments(filter);
    const totalPage = Math.ceil(totalPost / limit);
    return res.status(200).json({
      message: "Posts fetched successfully",
      body: {
        result: posts,
        totalPage,
        currentPage: page,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

export const deletePost = async (
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
    const sub = jwtDecode<JwtPayloadOptions>(token).sub;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    let post;
    if (role == ROLES.STAFF || role == ROLES.DOCTOR) {
      post = await Post.findOneAndUpdate(
        { _id: req.params.id, created_by: sub },
        { status: 0 }
      );
    } else if (role == ROLES.ADMIN) {
      post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { status: 0 }
      );
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      body: {
        id: req.params.id,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

// for guest
export const getPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, $or: [{ status: 2 }] }).populate({
      path: 'categories',  // populate categories
      match: { status: 2 }, // only categories with status 2
      select: 'name _id' // specify the fields you want to retrieve
    });
    if (post) {
      post.view = post.view + 1;
      post.save();
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      body: {
        result: post,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}
// for guest
export const getAllActivePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (page - 1) * limit;
    let filter: any = {
      $and: [{ status: 2 }]
    }

    let search = req.query.search && (req.query.search as string).replace(/^"|"$/g, '');
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$and.push({
        $or:
          [
            { title: searchRegex },
            { short_desc: searchRegex },
          ]
      })
    }
    const posts = await Post.find(filter).select('slug image short_desc position title view status createdAt').populate({
      path: 'categories',  // populate categories
      match: { status: 2 }, // only categories with status 2
      select: 'name _id' // specify the fields you want to retrieve
    }).sort({ createdAt: -1 });
    const totalPost = await Post.countDocuments(filter);
    const totalPage = Math.ceil(totalPost / limit);
    return res.status(200).json({
      message: "Posts fetched successfully",
      body: {
        result: posts,
        totalPage,
        currentPage: page,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

// for admin, doctor, staff
export const getPostById = async (
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
    const sub = jwtDecode<JwtPayloadOptions>(token).sub;
    let post;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    } else if (role == ROLES.STAFF || role == ROLES.DOCTOR) {
      post = await Post.findOne({ _id: req.params.id, created_by: sub, $or: [{ status: 2 }, { status: 1 }] }).populate({
        path: 'categories',  // populate categories
        match: { status: 2 }, // only categories with status 2
        select: 'name _id' // specify the fields you want to retrieve
      });
    } else if (role == ROLES.ADMIN) {
      post = await Post.findOne({ _id: req.params.id, $or: [{ status: 2 }, { status: 1 }] }).populate({
        path: 'categories',  // populate categories
        match: { status: 2 }, // only categories with status 2
        select: 'name _id' // specify the fields you want to retrieve
      });
    }



    if (!post) {
      throw new Error("Post not found");
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      body: {
        result: post,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

export const getRelatedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 2 }).populate({
      path: 'categories',  // populate categories
      match: { status: 2 }, // only categories with status 2
      select: '_id' // specify the fields you want to retrieve
    });
    if (!post) {
      throw new Error("Post not found");
    }
    const posts = await Post.find({
      categories: { $in: post.categories.map(category => category._id) }, // ensure categories is an array of IDs
      status: 2,
      _id: { $ne: post._id } // exclude the current post
    }).limit(6).select('slug image position title view status createdAt');
    return res.status(200).json({
      message: "Related posts fetched successfully",
      body: {
        result: posts,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}

export const getAllNewPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const posts = await Post.find({ status: 2 }).select('slug short_desc image position title view status createdAt ').populate({
      path: 'categories',  // populate categories
      match: { status: 2 }, // only categories with status 2
      select: 'name _id' // specify the fields you want to retrieve
    }).sort({ position: -1, createdAt: -1 }).limit(5);
    return res.status(200).json({
      message: "Posts fetched successfully",
      body: {
        result: posts,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
}