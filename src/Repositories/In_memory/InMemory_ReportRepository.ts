import { Report } from "../../Models/Reports";

class ReportRepository {
  private dataBase: Report[];

    constructor() {
      this.dataBase = [];
    }

    async getReports(): Promise<Report[]> {
      return this.dataBase;
    }

    async getReportByCode(code: String): Promise<Report | string> {
      const data: Report[] = this.dataBase.filter((valor) => {
        return valor.report_code === code;
      });

      if (data.length > 0) {
        return data[0];
      } else {
        return `Não foi possível encontrar o código ${code}`;
      }
    }

    async getReportById(id: string): Promise <number>{
      return this.dataBase.findIndex((valor) =>{
        return valor.id === id
      });
    }

    async addReport(reportData: Report): Promise<Report | string> {
      const verify = this.dataBase.filter((dado) => {
        return dado.report_code === reportData.report_code;
      });

      if (verify.length > 0) {
        return `O código de prontuário ${verify[0].report_code} já existe na base de dados!`;
      } else {
        this.dataBase.push(reportData);
      }

      return reportData;
    }

    async updateReport(data: Report, id: string): Promise <Report | string>{

      const index: number = await this.getReportById(id);

      if(index != -1){
        this.dataBase[index] = data;
        this.dataBase[index].id = id;
        return this.dataBase[index];

      } else {
        return `Não foi possível encontrar o prontuário com ID ${id}`
      }
    }

    async deleteReport(id: string): Promise <String> {
      const index = await this.getReportById(id);
      if(index != -1){
        delete this.dataBase[index];
        return `Registro deletado`
      } 
        return `Registro não encontrado!`
    }
  
}

export default ReportRepository;
