import { Request, Response } from "express";
import { Report } from "../Models/Reports";
import ReportService from "../Services/ReportService";
import { reportDataSchema} from "../Schemas/ReportSchema";

const reportService = new ReportService();

class ReportController {

  async getReports(req: Request, res: Response): Promise <void>{
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

  async getReportByCode(req: Request, res: Response): Promise <void>{
    const code: string = req.params.report_code;
    try{
      const foundData = await reportService.getReportByCode(code);
      res.status(200).json(foundData);

    } catch (error){
      res.status(400).json({error: "Não foi possível encontrar o regitro"});
    }
  }

  async addReport(req: Request, res: Response): Promise <void>{
    const reportData: Report = req.body;
    try {
      await reportDataSchema.validate(reportData, {stripUnknown: true});
      const addedData = await reportService.addReport(reportData);
      res.status(200).json(addedData);
    } catch (error) {
      res.status(400).json({error: "Não foi possível adicionar o regitro"});
    }
  }

  async updateReport(req: Request, res: Response): Promise <void>{
    const data: Report = req.body
    const id: string = req.params.id

    try {
      await reportDataSchema.validate(data);
      const updatedReport: Report | string = await reportService.updateReport(data, id);
      res.status(200).json(updatedReport);
    } catch (error: any) {
        res.status(400).json({error: "Não foi possível atualizar o regitro"});
    }
  }


  async deleteReport(req: Request, res: Response): Promise <void>{
    const id: string = req.params.id

    try{
      const deletedReport: String = await reportService.deleteReport(id); 
      res.status(200).json(deletedReport);

    } catch (error: any){
      res.status(400).json({error: "Não foi possível deletar o regitro"})
    }

  }

}

export default ReportController;
