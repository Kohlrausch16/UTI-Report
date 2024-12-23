import  jwt, { Jwt } from "jsonwebtoken";
import { User } from "../../Models/AuthUser";


export const generateJWT =  (payload: User, expiresIn: string): string => {
    const options: any = {
        expiresIn
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);
    return token
}


export const verifyJWT = (payload: string, expiresIn: string): boolean =>{

    try{
        const verify = jwt.verify(payload, expiresIn);
        if(!verify){
            return false
        } return true
    } catch(error){
        return false
    }
}


export const decodeJWT = (payload: string) =>{
    const data = jwt.decode(payload);
    return data;
}

