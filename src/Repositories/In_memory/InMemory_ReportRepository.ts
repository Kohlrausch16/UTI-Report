import { Report } from "../../Models/Reports"


class ReportRepository{

    private dataBase: Report[];

    constructor(){
        this.dataBase = [];
    }


    async getReports(): Promise <Report[]> {
        return this.dataBase
    }


    async getReportByCode(code: String): Promise <Report | String> {
        const data: Report | undefined = this.dataBase.find((value) =>{
            return value.record_code === code; 
        });

        if(data !== undefined){
            return data
        } return `Não foi possível encontrar o código ${code}`;
    }
















    async addReport(reportData: Report){
        const verify = this.dataBase.filter((dado) =>{
            return dado.record_code === reportData.record_code           
            });
            
          if(verify.length > 0){
                return `O código de prontuário ${verify[0].record_code} já existe na base de dados!`;
            } else {
                this.dataBase.push(reportData);
            }
       
        
        return reportData;
    }
}


export default ReportRepository;