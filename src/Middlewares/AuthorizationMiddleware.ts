import { Request, Response, NextFunction } from "express";
import { decodeJWT } from "../Services/Helpers/authHelper";
import DataBaseUsersRepository from "../Repositories/DataBase/DataBaseUsersRepository";
import { User, UserRole } from "../Models/AuthUser";

export const authozitationMiddleware  = (access: string) => {
    return(async (req: Request, res: Response, next: NextFunction) =>{

      try{

        const dataBaseRepository = new DataBaseUsersRepository();
        const token: any = req.headers.token;
        const { user_id, user_role, email, password }: any = decodeJWT(token);
        const decodedUser: User = { user_id, user_role, email, password };

        const data = await dataBaseRepository.getRoleById(decodedUser.user_role);

        let item = '';

        for(item in data){
          if(item === access){
            console.log(data[item]);
            console.log(data)
            if(data[access] === 1){
              console.log('Pelo menos passou por aqui!');
              next();
            } else {
              throw new Error('Usuário não pode acessar a rota!');
            }
          }
        }

      } catch(error: any){
        res.json({ error: error.message });
      }
    });
      
}
