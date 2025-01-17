import { Router } from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';

const route = Router();

route.get('/', BlogControllers.getAllBlog);
route.get('/:id', BlogControllers.getSingleBlog);
route.post(
    '/',
    auth('user'),
    validateRequest(BlogValidation.createBlogSchema),
    BlogControllers.createBlog,
);
route.patch(
    '/:id',
    auth('user'),
    validateRequest(BlogValidation.updateBlogSchema),
    BlogControllers.updateBlog,
);
route.delete(
    '/:id',
    auth('user'),
    BlogControllers.deleteBlog,
);

route.get('/');

export const BlogRoute = route;
