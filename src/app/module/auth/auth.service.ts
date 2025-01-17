import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import config from "../../config";

export interface TRegistration {
    name: string;
    email: string;
    password: string;
}
const registerUser = async (payload: TRegistration) => {
    const isuserExist = await User.isUserExist(payload?.email);

    if (isuserExist) {
        throw new AppError(400, 'User already exist');
    }
    const result = await User.create(payload)

    const { _id, name, email } = result;
    return { _id, name, email };
}

const loginUserIntoDB = async (payload: TLogin) => {

    const isUserExist = await User.isUserExist(payload?.email);

    if (!isUserExist) {
        throw new AppError(401, 'User does not exist');
    }

    // Check if the passowrd are same or not
    const isPasswordMatched = await User.isPasswordMatched(
        payload?.password,
        isUserExist?.password,
    );

    if (!isPasswordMatched) {
        throw new AppError(401, 'Invalid credentials');
    }
    const token = jwt.sign(
        {
            role: isUserExist?.role,
            email: isUserExist?.email,
        },
        config.jwt_access_secret as string,
        { expiresIn: '10d' },
    );
    return token;
};

export const AuthService = {
    registerUser,
    loginUserIntoDB
};