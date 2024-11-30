import { Router } from "express";
import ReportController from "./src/Controllers/ReportController";

const router = Router();

const reportController = new ReportController;

router.get('/report');
router.get('/report/:id');
router.get('/report/:codigo');
router.post('/report', reportController.addReport);
router.put('/report/:id');
router.delete('/report/:id');


export default router;