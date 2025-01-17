import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import status from 'http-status';
import { User } from '../module/user/user.model';
import { TRole } from '../module/user/user.interface';

const auth = (...roles: TRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log(req.headers.authorization)
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
        console.log({ user: req.user })
        next();
    });
};


export default auth;
