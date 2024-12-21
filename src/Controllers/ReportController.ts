import { Request, Response } from "express";
import { Report } from "../Models/Reports";
import ReportService from "../Services/ReportService";
import { reportDataSchema} from "../Schemas/ReportSchema";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";
import DatabaseRepository from "../Repositories/DataBase/DataBase_Repository";

const reportService = new ReportService(new DatabaseRepository());

class ReportController {

  async getReports(req: Request, res: Response){
    try {
      const data: Report[] = await reportService.getReports();
      if (data.length >= 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({erro: "Não existem dados na base"});
      } 
    } catch (error) {
      res.status(400).json({error: "Não foi possível encontrar o regitro"});
    }
  }

  async getReportByCode(req: Request, res: Response){
    const code: string = req.params.report_code;
    try{
      const foundData = await reportService.getReportByCode(code);
      res.status(200).json(foundData);
    } catch (error:any){
      res.status(400).json({"error": error.message});
    }
  }

  async addReport(req: Request, res: Response){
    const reportData = req.body;
    try {
      await reportDataSchema.validate(reportData, {stripUnknown: true});
      const addedData = await reportService.addReport(reportData);
      res.status(200).json(addedData);
    } catch (error: any) {
      res.status(400).json({"error": error.message});
    }
  }

  async updateReport(req: Request, res: Response){
    const data: Report = req.body
    const id: string = req.params.id
    try {
      await reportDataSchema.validate(data);
      const updatedReport: Report | string = await reportService.updateReport(data, id);
      res.status(200).json(updatedReport);
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
  }


  async deleteReport(req: Request, res: Response){
    const id: string = req.params.id
    try{
      const deletedReport: String = await reportService.deleteReport(id); 
      res.status(200).json(deletedReport);
    } catch (error: any){
      res.status(400).json({error: error.message})
    }
  }

}

export default ReportController;
