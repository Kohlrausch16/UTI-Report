import { Request, Response, NextFunction } from "express"
import AuthService from "../Services/AuthService";
import DataBaseUsersRepository from "../Repositories/DataBase/DataBaseUsersRepository";
import { AuthRefreshToken } from "../Models/AuthAccess";

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise <void> => {

    const authService = new AuthService(new DataBaseUsersRepository());

    const {token, refresh_token} = req.headers;

    if(!token || !refresh_token){
        res.status(400).json({error: "É necessária a autenticação do usuário!"});
    } else {

        const updatedTokens = await authService.refreshToken({token, refresh_token} as AuthRefreshToken);
        res.set('token', updatedTokens.token);
        res.set('refresh_token', updatedTokens.refreshToken);
        next();
    }

    

    return
}