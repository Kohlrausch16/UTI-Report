import { Router } from "express";
import PDFGeneratorController from "../Controllers/PDFGeneratorController";

const pdfRouter = Router();
const pdfgeneratorController = new PDFGeneratorController();

pdfRouter.post('/pdfgenerator/:record_code', pdfgeneratorController.generator);


export default pdfRouter;
