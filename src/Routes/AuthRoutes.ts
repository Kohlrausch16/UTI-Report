import { Router } from "express";


const authRouter = Router();

authRouter.get('/auth', () => console.log('Bateu aqui!!'));



export default authRouter;