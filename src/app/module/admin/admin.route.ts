import { Router } from "express";
import auth from "../../middlewares/auth";
import { AdminController } from "./admin.controller";


const route = Router();

route.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);
route.get('/users', auth('admin'), AdminController.getAllUser);
route.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);

export const AdminRoute = route;
