import { Router } from "express";
import ReportController from "./src/Controllers/ReportController";

const router = Router();

const reportController = new ReportController;

router.get('/report', reportController.getReports);
//router.get('/report/:id');    => É realmente necessário? A busca pode ser feita via código
router.get('/report/:codigo', reportController.getReportByCode);
router.post('/report', reportController.addReport);
router.put('/report/:id');
router.delete('/report/:id');


export default router;