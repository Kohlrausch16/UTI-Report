import { Report } from "../../Models/Reports"


class ReportRepository{

    private dataBase: Report[];

    constructor(){
        this.dataBase = [];
    }

    async addReport(reportData: Report){
        const verify = this.dataBase.filter((dado) =>{
            return dado.cpf === reportData.cpf           
            });
            
          if(verify.length > 0){
                console.log('Deu errado');
                return 'Este CPF já existe na base de dados!';
            } else {
                this.dataBase.push(reportData);
                console.log('Deu certo');
            }
       
        
        return reportData;
    }
}


export default ReportRepository;