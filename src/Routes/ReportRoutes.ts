import { Router } from "express";
import ReportController from "../Controllers/ReportController";
import { authenticationMiddleware } from "../Middlewares/AuthenticationMiddleware";
import { authozitationMiddleware } from "../Middlewares/AuthorizationMiddleware";

const reportRouter = Router();

const reportController = new ReportController();

reportRouter.get("/report", authenticationMiddleware, authozitationMiddleware ("getReports"),  reportController.getReports);
reportRouter.get("/report/:report_code", authenticationMiddleware, authozitationMiddleware ("getReportByCode"),  reportController.getReportByCode);
reportRouter.post("/report", authenticationMiddleware, authozitationMiddleware ("addReport"),  reportController.addReport);
reportRouter.put("/report/:id", authenticationMiddleware, authozitationMiddleware ("updateReport"),  reportController.updateReport);
reportRouter.delete("/report/:id", authenticationMiddleware, authozitationMiddleware ("deleteReport"), reportController.deleteReport);

export default reportRouter;
