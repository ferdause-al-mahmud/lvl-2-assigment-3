import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import status from 'http-status';
import { User } from '../module/user/user.model';
import { TRole } from '../module/user/user.interface';
import { Blog } from '../module/blog/blog.model';

const auth = (...roles: TRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError(status.UNAUTHORIZED, 'UnAuthorize access!!!');
        }
        const bearer = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        if (!roles.includes(bearer?.role)) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorize access!!!');
        }
        const isUserExist = await User.isUserExist(bearer?.email);

        if (isUserExist?.isBlocked) {
            throw new AppError(status.UNAUTHORIZED, 'This person is blocked');
        }
        req.user = bearer;
        next();
    });
};

const findAuthorId = async (email: string) => {
    const result = await User.findOne({ email }).lean();
    return result?._id;
};

export const updateOrDeleteAuth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.user;
        const { id } = req.params;
        const isBlogExist = await Blog.findById(id);
        if (!isBlogExist) {
            throw new AppError(404, 'Blog cannot be found');
        }
        const authorId = await findAuthorId(email);
        const isAuthorUpdatingHisBlog = isBlogExist.author.equals(authorId);
        if (!isAuthorUpdatingHisBlog) {
            throw new AppError(404, 'You did not created this blog');
        }
        next();
    });
};

export default auth;
