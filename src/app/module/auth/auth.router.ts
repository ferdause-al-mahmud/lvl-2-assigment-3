import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'

const authRouter = Router()

authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthController.createUser)

authRouter.post('/login', AuthController.loginUser);

export default authRouter
