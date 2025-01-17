import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


const createUser = catchAsync(async (req, res) => {
    const payload = req.body

    const result = await AuthService.registerUser(payload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'User registered successfully',
    });
})

const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthService.loginUserIntoDB(payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: { token: result },
        message: 'Login successful',
    });
});

export const AuthController = {
    createUser,
    loginUser
};
