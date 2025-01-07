import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config';

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },
        isBlocked: {
            type: Boolean,
            default: false,
            required: true
        }

    }
    ,
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

const User = model<IUser>('User', userSchema)
export default User
