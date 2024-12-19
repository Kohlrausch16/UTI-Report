import express, {urlencoded} from "express";
import dotenv from "dotenv";
import authRouter from "./src/Routes/AuthRoutes";
import reportRouter from "./src/Routes/ReportRoutes";
import pdfRouter from "./src/Routes/PDFGeneratorRoutes";

dotenv.config();

const server = express();
server.use(express.urlencoded({extended: true}));

server.use(express.json());
server.use(reportRouter, pdfRouter, authRouter);
server.listen(process.env.PORT);