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

    async addReport(reportData: Report): Promise <Report | string>{
        const id = uuidv4();
        reportData.id = id;
        const addedData = await reportRepository.addReport(reportData);
        return addedData;   
    }







    async updateReport(data: Report, id: string): Promise <Report | string>{

        const updatedReport: Report | string= await reportRepository.updateReport(data, id);
        return updatedReport;

    }















    async deleteReport(id: string): Promise <String>{
        const deletedReport: String = await reportRepository.deleteReport(id);
        return deletedReport;
    }

}


export default ReportService;