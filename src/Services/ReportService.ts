import { Response } from "express";
import { Report } from "../Models/Reports";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";
import { v4 as uuidv4 } from 'uuid';

const reportRepository = new ReportRepository;

class ReportService{

    async getReports(): Promise <Report[]>{
        const data: Report [] = await reportRepository.getReports();
        return (data);
    }

    async getReportByCode(code: string): Promise <Report> {
        const foundData: Report = await reportRepository.getReportByCode(code);
        return foundData;

    }

    async addReport(reportData: Report): Promise <Report>{
        const patient_id = uuidv4();
        reportData.personal_data.patient_id = patient_id;

        const doctor_id = uuidv4();
        reportData.doctor_data.doctor_id = doctor_id;

        const discharge_id = uuidv4();
        reportData.discharge_data.discharge_id = discharge_id;

        const entry_id = uuidv4();
        reportData.entry_data.entry_id = entry_id;

        const report_id = uuidv4();
        reportData.procedure_data.report_id = report_id;
        
        const addedData: Report = await reportRepository.addReport(reportData); 
        return addedData;   
    }


    async updateReport(data: Report, id: string): Promise <Report>{

        const updatedReport: Report = await reportRepository.updateReport(data, id);
        return updatedReport;

    }

    async deleteReport(id: string): Promise <string>{
        const deletedReport: string = await reportRepository.deleteReport(id);
        return deletedReport;
    }

}


export default ReportService;