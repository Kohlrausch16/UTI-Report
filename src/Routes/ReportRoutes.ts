import { Router } from "express";
import ReportController from "../Controllers/ReportController";
import { authenticationMiddleware } from "../Middlewares/AuthenticationMiddleware";
import { authozitationMiddleware } from "../Middlewares/AuthorizationMiddleware";

const reportRouter = Router();

const reportController = new ReportController();

reportRouter.get("/report", reportController.getReports);
reportRouter.get("/report/:report_code", reportController.getReportByCode);
reportRouter.post("/report", reportController.addReport);
reportRouter.put("/report/:id", reportController.updateReport);
reportRouter.delete("/report/:id", authenticationMiddleware, authozitationMiddleware ("deleteReport"), reportController.deleteReport);

export default reportRouter;
