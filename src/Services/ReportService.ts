import { Response } from "express";
import { Report } from "../Models/Reports";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";
import { IdInsertion } from "./Helpers/InsertionID";
import DatabaseRepository from "../Repositories/DataBase/DataBase_Repository";

const idInsertion = new IdInsertion();

class ReportService{

    constructor (private _database: ReportRepository | DatabaseRepository) {}

    async getReports(): Promise <Report[]>{
        const data: Report [] = await this._database.getReports();
        return (data);
    }

    async getReportByCode(code: string): Promise <Report> {
        const foundData: Report = await this._database.getReportByCode(code);
        return foundData;

    }

    async addReport(reportData: Report): Promise <Report>{
        const data: Report = await idInsertion.idInsertion(reportData);
        const addedData: Report = await this._database.addReport(data); 
        return addedData;   
    }

    async updateReport(data: Report, id: string): Promise <Report>{

        const updatedReport: Report = await this._database.updateReport(data, id);
        return updatedReport;

    }

    async deleteReport(id: string): Promise <string>{
        const deletedReport: string = await this._database.deleteReport(id);
        return deletedReport;
    }

}


export default ReportService;