import { Response } from "express";
import { Report } from "../Models/Reports";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";
import { v4 as uuidv4 } from 'uuid';

const reportRepository = new ReportRepository;

class ReportService{

    constructor(){

    }

    async getReports(): Promise <Report[]>{
        const data = await reportRepository.getReports();
        return (data);
    }



    async getReportByCode(code: string): Promise <Report | String> {

        const foundData = await reportRepository.getReportByCode(code);
        return foundData;

    }




















    async addReport(reportData: Report){
        const id = uuidv4();
        reportData.id = id;
        const addedData = await reportRepository.addReport(reportData);
        return addedData;   
    }

}


export default ReportService;