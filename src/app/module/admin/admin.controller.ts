import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminService.blockUserFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'User is Blocked successfully',
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Users retrived successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminService.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: null,
    message: 'Blog deleted successfully',
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
  getAllUser,
};
