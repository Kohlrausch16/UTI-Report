import { Router } from "express";
import ReportController from "../Controllers/ReportController";

const reportRouter = Router();

const reportController = new ReportController();

reportRouter.get("/report", reportController.getReports); 
//reportRouter.get("/report/:report_code", reportController.getReportByCode);
reportRouter.post("/report", reportController.addReport);
reportRouter.put("/report/:id", reportController.updateReport);
reportRouter.delete("/report/:id", reportController.deleteReport);

export default reportRouter;
