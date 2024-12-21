import { User } from "../Models/AuthUser";
import InMemoryAuthRepository from "../Repositories/In_memory/InMemory_AuthRepository";
import AuthService from "../Services/AuthService";
import { Request, Response } from "express";
import { userSchema } from "../Schemas/UserSchema";

const authService = new AuthService(new InMemoryAuthRepository());


class AuthController{


    async createUser(req: Request, res: Response){
        try{
            const data:  User = await userSchema.validate(req.body, {stripUnknown: true});
            const userData: User = await  authService.createUser(data);
            res.status(200).json(userData);

        } catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

    async deleteUser(req: Request, res: Response){
        try{
            const deletedUser: string = await authService.deleteUser(req.params.user_id as string);
            res.status(200).json({deletedUser});

        } catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

}

export default AuthController;
