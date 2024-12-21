import { Router } from "express";
import AuthController from "../Controllers/AuthController";

const authRouter = Router();

const authController = new AuthController();



authRouter.post('/auth', );
authRouter.post('/refresh_token', );


authRouter.post('/auth/user', authController.createUser);
authRouter.delete('/auth/user/:user_id', authController.deleteUser);


authRouter.post('/auth/password');



export default authRouter;