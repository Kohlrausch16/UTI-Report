import { User } from "../../Models/AuthUser";
import { AuthToken } from "../../Models/AuthAccess";
import DataBaseUsersRepository from "../DataBase/DataBaseUsersRepository";

class InMemoryAuthRepository{

    private _database: User[];


    constructor(){
        this._database = []
    }


    getUserByEmail(addedData: User): User{
        const ifEmailExists = this._database.find((item) =>{
            return item.email === addedData.email
        });
        if(ifEmailExists){
            throw new Error(`O email ${addedData.email} já está cadastrado`);
        }
        return addedData;
    }


    async getUserById(user_id: string): Promise <number | string>{

        const foundUser: number = this._database.findIndex((item) =>{
            return item.user_id === user_id;
        });
        if(foundUser === -1){
            throw new Error(`Usuário ${user_id} não encontrado`);
        }
        return foundUser
    }

    async createUser(addedData: User): Promise <User>{

        await this.getUserByEmail(addedData);
        await this._database.push(addedData);
        return addedData
    }

    async deleteUser(user_id: string): Promise <string>{

        const foundUser: any = await this.getUserById(user_id);
        delete this._database[foundUser];
        return `Usuário ${user_id} deletado`
    }

}


export default InMemoryAuthRepository;