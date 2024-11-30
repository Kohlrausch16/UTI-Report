import { Request, Response } from "express";
import { Report } from "../Models/Reports";
import ReportService from "../Services/ReportService";
import { reportCodeSchema, reportDataSchema } from "../Schemas/ReportSchema";

const reportService = new ReportService();

class ReportController {
  constructor() {}

  async getReports(req: Request, res: Response) {
    const data: Report[] = await reportService.getReports();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Não existem dados na base" });
    }
  }

  async getReportByCode(req: Request, res: Response) {
    const code: String = req.params.record_code;
    try {
      await reportCodeSchema.validate(code);
      const foundReport: Report | String = await reportService.getReportByCode(
        code
      );
      res.status(200).json(foundReport);
    } catch (error) {
      res.status(400).json({ erro: error });
    }
  }

  async addReport(req: Request, res: Response) {
    const reportData: Report = req.body;
    try {
      await reportDataSchema.validate(reportData);
      const addedData = await reportService.addReport(reportData);
      res.status(200).json({ success: addedData });
    } catch (error) {
      res.status(400).json({ erro: error });
    }
  }
}

export default ReportController;
