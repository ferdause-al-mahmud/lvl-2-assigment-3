import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


const createUser = catchAsync(async (req, res) => {
    const payload = req.body

    const result = await AuthService.createUser(payload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'User registered successfully',
    });
})

export const AuthController = {
    createUser,
};
