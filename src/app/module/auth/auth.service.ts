import { User } from "../user/user.model";

export interface TRegistration {
    name: string;
    email: string;
    password: string;
}
const createUser = async (payload: TRegistration) => {
    const result = await User.create(payload)

    const { _id, name, email } = result;
    return { _id, name, email };
}

export const AuthService = {
    createUser,
};