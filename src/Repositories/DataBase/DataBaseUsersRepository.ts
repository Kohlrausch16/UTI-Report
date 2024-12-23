import dotenv from "dotenv"
import { User } from "../../Models/AuthUser";
import { AuthToken } from "../../Models/AuthAccess";

dotenv.config();

const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONECTION_STRING)


class DataBaseUsersRepository{

    async getUserByEmail(data: User): Promise <User>{

        const foundData: User = await client.query(`SELECT * FROM users WHERE email= ?;`, data.email);
        if(!foundData){
            throw new Error("Usuário não encontrado");
        }

        return foundData
    }

    async getUserByEmailAuthentication(data: AuthToken): Promise <User>{        
        
        const foundData = await client.query(`SELECT * FROM users WHERE email= ?;`, data.email);

        if(!foundData){
            throw new Error("Usuário não encontrado");
        }

        return foundData[0][0]
    }

    async getUserById(user_id: string): Promise <number | string>{

        const foundData: any = await client.query(`SELECT * FROM users WHERE user_id= ?;`, user_id);

        if(!foundData){
            throw new Error("Usuário não encontrado");
        }

        return foundData[0][0]
    }

    async createUser(addedData: User): Promise <User>{

        const userData = [
            addedData.user_id,
            addedData.user_role,
            addedData.email,
            addedData.password
        ];

        await client.query(`INSERT INTO users (user_id, user_role, email, password) 
        VALUES (?, ?, ?, ?)`, userData);

        return addedData;

    }

    async deleteUser(user_id: string): Promise <string>{

        await this.getUserById(user_id);

        await client.query(`DELETE FROM users WHERE user_id = ?;`, user_id);

        return `Usuário deletado!`
        
    }

}

export default DataBaseUsersRepository;