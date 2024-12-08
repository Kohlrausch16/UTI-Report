import express, {urlencoded} from "express";
import path from "path";
import dotenv from "dotenv";
import reportRouter from "./src/Routes/ReportRoutes";
import pdfRouter from "./src/Routes/PDFGeneratorRoutes";

dotenv.config();

const server = express();
server.use(express.urlencoded({extended: true}));

server.use(reportRouter, pdfRouter);
server.listen(process.env.PORT);