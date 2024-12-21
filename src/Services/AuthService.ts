import InMemoryAuthRepository from "../Repositories/In_memory/InMemory_AuthRepository";
import { User } from "../Models/AuthUser";
import { v4 as uuidv4 } from "uuid";

class AuthService{

    constructor(private _authDatabase: InMemoryAuthRepository){}


    async createUser(addedData: User): Promise <User>{
        addedData.user_id =  uuidv4();
        const createdUser: User = await this._authDatabase.createUser(addedData);
        return createdUser;
    }


    async deleteUser(user_id: string): Promise <string>{
        const deletedUser: string = await this._authDatabase.deleteUser(user_id);
        return deletedUser
    }

}

export default AuthService;