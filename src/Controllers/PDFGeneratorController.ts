import { Request, Response } from "express";
import ReportService from "../Services/ReportService";
import { Report } from "../Models/Reports";
import PDFGeneratorService from "../Services/PDFGeneratorService";
import ReportRepository from "../Repositories/In_memory/InMemory_ReportRepository";
import DatabaseRepository from "../Repositories/DataBase/DataBaseReportRepository";

class PDFGeneratorController {
  async generator(req: Request, res: Response): Promise<any> {
    try {
      const reportService = new ReportService(new DatabaseRepository());

      const code: string = req.params.record_code;
      const data: any = await reportService.getReportByCode(code);

      if (typeof data !== "string") {
        const pdfGeneratorService = new PDFGeneratorService();
        const document: File = await pdfGeneratorService.generate(
          data as Report
        );
        const fileUrl = `http://localhost:3000/public/reports/${data.report_code}_Prontuario.pdf`;
        res.status(200).json({ URL: fileUrl });
      } else {
        res.status(400).json(data);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default PDFGeneratorController;
