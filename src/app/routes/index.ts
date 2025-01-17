import { Router } from 'express';
import authRouter from '../module/auth/auth.router';
import { BlogRoute } from '../module/blog/blog.route';
import { AdminRoute } from '../module/admin/admin.route';
const route = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/blogs',
        route: BlogRoute,
    },
    {
        path: '/admin',
        route: AdminRoute,
    },
];

moduleRoutes.map((r) => route.use(r.path, r.route));

export const Routes = route;
