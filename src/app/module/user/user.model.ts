import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
const userSchema = new Schema<IUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.statics.isUserExist = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
    password: string,
    hashedpassword: string,
) {
    return await bcrypt.compare(password, hashedpassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
