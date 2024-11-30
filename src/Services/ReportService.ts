import { Report } from "../Models/Reports";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";


const reportRepository = new ReportRepository;

class ReportService{

    constructor(){

    }

    async addReport(reportData: Report){

       const addedData = await reportRepository.addReport(reportData);
       return addedData;
        
    }

}


export default ReportService;