import { Router } from "express";
import AuthController from "../Controllers/AuthController";

const authRouter = Router();

const authController = new AuthController();



authRouter.post('/auth', authController.token);
authRouter.post('/refresh_token', authController.refreshToken);


authRouter.post('/auth/user', authController.createUser);
authRouter.delete('/auth/user/:user_id', authController.deleteUser);


authRouter.post('/auth/password');



export default authRouter;