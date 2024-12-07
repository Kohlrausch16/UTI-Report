import { Router } from "express";
import ReportController from "./src/Controllers/ReportController";

const router = Router();

const reportController = new ReportController();

router.get("/report", reportController.getReports); 
router.get("/report/:report_code", reportController.getReportByCode);
router.post("/report", reportController.addReport);
router.put("/report/:id", reportController.updateReport);
router.delete("/report/:id", reportController.deleteReport);

export default router;
