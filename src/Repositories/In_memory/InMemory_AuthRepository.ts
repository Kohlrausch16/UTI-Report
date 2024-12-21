import { User } from "../../Models/AuthUser";


class InMemoryAuthRepository{

    private _database: User[];


    constructor(){
        this._database = []
    }


    async getUserByEmail(addedData: User){
        const ifEmailExists = this._database.find((item) =>{
            return item.email === addedData.email
        });
        if(ifEmailExists){
            throw new Error(`O email ${addedData.email} já está cadastrado`);
        }
        addedData.password = "Não informado por questão de segurança"
        return addedData;
    }


    getUserById(user_id: string): number{

        const foundUser: number | undefined = this._database.findIndex((item) =>{
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

        const foundUser = await this.getUserById(user_id);
        delete this._database[foundUser];
        return `Usuário ${user_id} deletado`
    }

}


export default InMemoryAuthRepository;