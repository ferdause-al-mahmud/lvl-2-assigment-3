import { Router } from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const route = Router();

route.get('/', BlogControllers.getAllBlog);
route.get('/:id', BlogControllers.getSingleBlog);
route.post(
    '/',
    validateRequest(BlogValidation.createBlogSchema),
    BlogControllers.createBlog,
);
route.patch(
    '/:id',
    validateRequest(BlogValidation.updateBlogSchema),
    BlogControllers.updateBlog,
);
route.delete(
    '/:id',
    BlogControllers.deleteBlog,
);

route.get('/');

export const BlogRoute = route;
