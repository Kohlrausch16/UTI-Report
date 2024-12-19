import { Report } from "../../Models/Reports";
import DatabaseRepository from "../DataBase/DataBase_Repository";

class ReportRepository /*implements DatabaseRepository*/{
  private dataBase: Report[];

    constructor() {
      this.dataBase = [];
    }

    async getReports(): Promise<Report[]> {
      return this.dataBase;
    }

    async getReportByCode(code: String): Promise<Report> {
      const data: Report[] = this.dataBase.filter((valor) => {
        return valor.procedure_data.report_code === code;
      });

      if (data.length <= 0) {
        throw new Error (`Não foi possível encontrar o código ${code}`);
      }  
      return data[0];
    
    }

    async getReportById(id: string): Promise <number>{
      return this.dataBase.findIndex((valor) =>{
        return valor.procedure_data.procedure_id === id
      });
    }

    async addReport(reportData: Report): Promise<Report> {
      const verify = this.dataBase.filter((dado) => {
        return dado.procedure_data.report_code === reportData.procedure_data.report_code;
      });

      if (verify.length > 0) {
        throw new Error (`O código de prontuário ${verify[0].procedure_data.report_code} já existe na base de dados!`);
      } 

      this.dataBase.push(reportData);
      return reportData;
    }

    async updateReport(data: Report, id: string): Promise <Report>{

      const index: number = await this.getReportById(id);

      if(index == -1){
        throw new Error(`Não foi possível encontrar o prontuário com ID ${id}`);
      }

      this.dataBase[index] = data;
      this.dataBase[index].procedure_data.procedure_id = id;
      return this.dataBase[index];
    }

    async deleteReport(id: string): Promise <string> {
      const index = await this.getReportById(id);
      if(index == -1){
        return `Registro não encontrado!`
      } 
      delete this.dataBase[index];
      return `Registro deletado`
    }
  
}

export default ReportRepository;
