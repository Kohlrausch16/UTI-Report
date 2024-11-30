import { Request, Response } from "express";
import { reportDataSchema } from "../Schemas/ReportSchema";
import { Report } from "../Models/Reports";
import ReportService from "../Services/ReportService";

const reportService = new ReportService;

class ReportController{
    constructor(){

    }

    async addReport(req: Request, res: Response){

        const reportData: Report = req.body;
        
        try{
            await reportDataSchema.validate(reportData);
            const addedData = await reportService.addReport(reportData);
            res.status(200).json({success: addedData});

        } catch(error){
            res.status(400).json({error: error});
        }
    }


}


export default ReportController;