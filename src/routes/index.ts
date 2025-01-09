import { Router } from 'express';
import authRouter from '../module/auth/auth.router';
const route = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },

];

moduleRoutes.map((r) => route.use(r.path, r.route));

export const Routes = route;
