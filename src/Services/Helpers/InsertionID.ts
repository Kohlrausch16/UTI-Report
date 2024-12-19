import { Report } from "../../Models/Reports"
import { v4 as uuidv4 } from 'uuid';


export class IdInsertion{
    
    async idInsertion(reportData: Report): Promise <Report>{

        const patient_id = uuidv4();
        reportData.personal_data.patient_id = patient_id;
 
        const doctor_id = uuidv4();
        reportData.doctor_data.doctor_id = doctor_id;

        const discharge_id = uuidv4();
        reportData.discharge_data.discharge_id = discharge_id;
        reportData.procedure_data.discharge_id = discharge_id;

        const entry_id = uuidv4();
        reportData.entry_data.entry_id = entry_id;
        reportData.procedure_data.entry_id = entry_id;

        const procedure_id = uuidv4();
        reportData.procedure_data.procedure_id = procedure_id;

        return reportData
    }
}   