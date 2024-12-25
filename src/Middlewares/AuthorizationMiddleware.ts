import { Request, Response, NextFunction } from "express";
import { decodeJWT } from "../Services/Helpers/authHelper";
import DataBaseUsersRepository from "../Repositories/DataBase/DataBaseUsersRepository";
import { User, UserRole } from "../Models/AuthUser";

export const authozitationMiddleware  = (access: string) => {
    return(async (req: Request, res: Response, next: NextFunction) =>{

      try{

        const dataBaseRepository = new DataBaseUsersRepository();
        const token: any = req.headers.token;
        const { user_id, user_role_id, email, password }: any = decodeJWT(token);

        const decodedUser = { user_id, user_role_id, email, password };


        console.log({decodedUser});
        console.log('======================');

        const data = await dataBaseRepository.getRoleById(user_id);

        console.log(data);

        for(let item in data){
          if(item === access){
            console.log(data[item]);
            console.log(data)
            if(data[access] === 1){
              next();
            } else {
            }
          }
        }

      } catch(error: any){
        res.json({ error: error.message });
      }
    });
      
}
