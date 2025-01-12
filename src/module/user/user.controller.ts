import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const payload = req.body

    const result = await UserService.createUser(payload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'User registered successfully',
    });
})

export const UserControllers = {
    createUser,
};
