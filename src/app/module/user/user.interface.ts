import { Model } from "mongoose"
import { userRole } from "./user.constant"

export interface IUser {
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    isBlocked: boolean
}

export type TRole = keyof typeof userRole;

export interface UserModel extends Model<IUser> {
    isUserExist(email: string): Promise<IUser>;
    isPasswordMatched(password: string, hashedpassword: string): Promise<boolean>;
    isUserBlocked(email: string): Promise<boolean>;
}
