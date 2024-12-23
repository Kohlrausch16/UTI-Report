import InMemoryAuthRepository from "../Repositories/In_memory/InMemory_AuthRepository";
import { AuthToken, AuthRefreshToken } from "../Models/AuthAccess";
import { User } from "../Models/AuthUser";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {generateJWT, verifyJWT, decodeJWT} from "./Helpers/authHelper"
import DataBaseUsersRepository from "../Repositories/DataBase/DataBaseUsersRepository";

class AuthService{

    constructor(private _authDatabase: InMemoryAuthRepository | DataBaseUsersRepository){}


    async token(validatedData: AuthToken): Promise <({token: string, refreshToken: string})>{

        const foundData: User = await this._authDatabase.getUserByEmailAuthentication(validatedData);
        console.log(foundData);
        const passwordValidation: boolean = await bcrypt.compare(validatedData.password, foundData.password);

        if(!passwordValidation){
            throw new Error("Acesso negado! E-mail e/ou senha incorretos");
        }

        const token: string = generateJWT(foundData, process.env.TOKEN_EXPIRE as string);
        const refreshToken: string = generateJWT(foundData, process.env.REFRESH_TOKEN_EXPIRE as string);

        return {token, refreshToken};
    }
    

    async refreshToken(data: AuthRefreshToken): Promise <({token: string, refreshToken: string})> {

        const verifyToken: boolean = await verifyJWT(data.token, process.env.TOKEN_EXPIRE as string);
        const verifyRefreshToken: boolean = await verifyJWT(data.refresh_token, process.env.REFRESH_TOKEN_EXPIRE as string);
        
        if(!verifyToken && verifyRefreshToken){
            throw new Error("Acesso expirado! Realize novo logIn!");
        }

        const {password, email, user_role, user_id}: any = await decodeJWT(data.refresh_token as string);

        const tokenData: User = {password, email, user_role, user_id};
        const token: string = generateJWT(tokenData, process.env.TOKEN_EXPIRE as string);
        const refreshToken: string = generateJWT(tokenData, process.env.REFRESH_TOKEN_EXPIRE as string);

        return {token, refreshToken};
    }


    async createUser(addedData: User): Promise <User>{
        addedData.user_id =  uuidv4();
        addedData.password = await bcrypt.hash(addedData.password, 10); 
        const createdUser: User = await this._authDatabase.createUser(addedData);
        return createdUser;
    }


    async deleteUser(user_id: string): Promise <string>{
        const deletedUser: string = await this._authDatabase.deleteUser(user_id);
        return deletedUser
    }

}

export default AuthService;