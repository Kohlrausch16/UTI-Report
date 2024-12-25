import { User, UserRole } from "../Models/AuthUser";
import InMemoryAuthRepository from "../Repositories/In_memory/InMemory_AuthRepository";
import AuthService from "../Services/AuthService";
import { Request, Response } from "express";
import { userSchema, roleSchema } from "./Schemas/UserSchema";
import { authTokenSchema, authRefreshTokenSchema } from "./Schemas/AuthSchema";
import { AuthRefreshToken } from "../Models/AuthAccess";
import DataBaseUsersRepository from "../Repositories/DataBase/DataBaseUsersRepository";

const authService = new AuthService(new DataBaseUsersRepository());

class AuthController {
  async token(req: Request, res: Response) {
    try {
      const validatedData = req.body;
      await authTokenSchema.validate(validatedData, { stripUnknown: true });
      const { token, refreshToken } = await authService.token(req.body);
      res.status(200).json({ token, refreshToken });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { token, refresh_token } = req.headers;

      await authRefreshTokenSchema.validate({ token, refresh_token }, { stripUnknown: true });
      const result = await authService.refreshToken({
        token,
        refresh_token,
      } as AuthRefreshToken);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }

  async createUser(req: Request, res: Response) {

    try {
      const data: User = await userSchema.validate(req.body, {
        stripUnknown: true,
      });

      const userData: User = await authService.createUser(data);
      res.status(200).json(userData);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async createRole(req: Request, res: Response){

      try{

        const data: UserRole | any = await roleSchema.validate(req.body, {stripUnknown: true});
        const createdRole: UserRole = await authService.createRole(data);

        res.status(200).json(createdRole);

      } catch(error: any){
        res.status(400).json({error: error.message})
      }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const deletedUser: string = await authService.deleteUser(
        req.params.user_id as string
      );
      res.status(200).json({ deletedUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;
