import dotenv from "dotenv"
import { User, UserRole } from "../../Models/AuthUser";
import { AuthToken } from "../../Models/AuthAccess";

dotenv.config();

const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONECTION_STRING)


class DataBaseUsersRepository{

    async getUserByEmail(data: User | AuthToken): Promise <User>{

        const foundData = await client.query(`SELECT * FROM users WHERE email= ?;`, data.email);

        if(!foundData){
            throw new Error("Usuário não encontrado");
        }

        return foundData[0][0];
    }

    async getUserById(user_id: string): Promise <number | string>{

        const foundData: any = await client.query(`SELECT * FROM users WHERE user_id= ?;`, user_id);

        if(!foundData){
            throw new Error("Usuário não encontrado");
        }

        return foundData[0][0]
    }

    async getRoleByName(name: string): Promise <UserRole | undefined>{

        const foundRole: any = await client.query(`SELECT * FROM user_role WHERE user_role=?`, name);     

        return foundRole[0][0];
    }


    async getRoleById(id: string): Promise <any>{

        const userData = await client.query(`
            SELECT
                users.*,
                user_role.*
            
            from users
                inner join user_role
                    on users.user_role_id = user_role.user_role_id;`, id);   

        return userData[0][0];

    }


    async createUser(addedData: User): Promise <User>{

        const foundRole = await this.getRoleByName(addedData.user_role);

        if(!foundRole || foundRole.user_role !== addedData.user_role){
            throw new Error (`O grupo de usuários ${addedData.user_role} não encontrado! Por gentileza, crie o respectivo grupo para adicionar usuários`);
        }

        const userData = [
            addedData.user_id,
            foundRole.user_role_id,
            addedData.email,
            addedData.password,
        ];

        await client.query(`INSERT INTO users (user_id, user_role_id, email, password) 
        VALUES (?, ?, ?, ?)`, userData);

        return addedData;

    }

    async createRole(roleData: UserRole): Promise <UserRole>{

        const foundRole: UserRole | undefined = await this.getRoleByName(roleData.user_role);

        if(foundRole){
            throw new Error (`Grupo de usuário ${roleData.user_role} já existente`);
        }

        const role_value = [
            roleData.user_role_id,
            roleData.user_role,
            roleData.permissions.getReports,
            roleData.permissions.getReportByCode,
            roleData.permissions.addReport,
            roleData.permissions.updateReport,
            roleData.permissions.deleteReport,
            roleData.permissions.generate
        ];

        await client.query(`INSERT INTO user_role (user_role_id, user_role, getReports, getReportByCode, addReport, updateReport, deleteReport, generate) VALUES (?,?,?,?,?,?,?,?);`, role_value);

        return roleData;
    }

    async deleteUser(user_id: string): Promise <string>{

        await this.getUserById(user_id);

        await client.query(`DELETE FROM users WHERE user_id = ?;`, user_id);

        return `Usuário deletado!`
        
    }

}

export default DataBaseUsersRepository;