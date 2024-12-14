import { Report } from "../../Models/Reports";
import { PrismaClient } from "@prisma/client"
import { PerosnalData, ReportData, DoctorData, DischargeData, EntryData } from "../../Models/Reports";

const prisma = new PrismaClient();

class ReportPrismaRepository{

    async getReports(): Promise <Report[]>{
        return []
    }


    /*async getReportByCode(code: string): Promise <Report>{

    }*/



    async addReport(reportData: Report): Promise <any>{
        
        console.log(reportData);

        const addedPerosnalData = await prisma.patient.create({
            data:{
                patient_id: reportData.personal_data.patient_id,
                name: reportData.personal_data.name,
                first_name: reportData.personal_data.first_name,
                age: reportData.personal_data.age,
                city: reportData.personal_data.city,
                sex: reportData.personal_data.sex,
                birthdate: new Date(reportData.personal_data.birthdate), 
                cpf: reportData.personal_data.cpf,
                mother_name: reportData.personal_data.mother_name,
                relative_name: reportData.personal_data.relative_name,
                relative_first_name: reportData.personal_data.relative_first_name,
                familiar_stand: reportData.personal_data.familiar_stand,
                phone: reportData.personal_data.phone,
                procedure_id: reportData.personal_data.procedure_id
            }
        });

        const addedDoctorData = await prisma.doctor.create({
            data:{
                doctor_id: reportData.doctor_data.doctor_id,
                doctor_name: reportData.doctor_data.doctor_name,
                doctor_first_name: reportData.doctor_data.doctor_first_name,
                procedure_id: reportData.procedure_data.procedure_id
            }
        });

        const addedProcedureData = await prisma.procedures.create({
            data: {
                procedure_id: reportData.procedure_data.procedure_id,
                report_code: reportData.procedure_data.report_code,
                procedure: reportData.procedure_data.procedure,
                bed: reportData.procedure_data.bed,
                procedure_status: reportData.procedure_data.procedure_status,
                procedure_date: new Date(reportData.procedure_data.procedure_date),
                note: reportData.procedure_data.procedure_note,
                patient_id: reportData.procedure_data.patient_id,
                doctor_id: reportData.procedure_data.doctor_id
            }
        });
    
        
        const addedEntryData = await prisma.entry.create({
            data:{
                entry_id: reportData.entry_data.entry_id,
                entry_date: new Date(reportData.entry_data.entry_date),
                symptoms: reportData.entry_data.symptoms,
                previous_diagnosis: reportData.entry_data.previous_diagnosis,
                clinical_conditions: reportData.entry_data.clinical_conditions,
                note: reportData.entry_data.entry_note,
                patient_id: reportData.entry_data.patient_id,
                procedure_id: reportData.entry_data.procedure_id
            }
        });

        const addedDischargeData = await prisma.discharge.create({
            data:{
                discharge_id: reportData.discharge_data.discharge_id,
                discharge_date: new Date(reportData.discharge_data.discharge_date),
                discharge_cause: reportData.discharge_data.discharge_cause,
                note: reportData.discharge_data.discharge_note,
                patient_id: reportData.discharge_data.patient_id,
                procedure_id: reportData.discharge_data.procedure_id
            }
        });


        const addedData = {addedPerosnalData, addedProcedureData, addedEntryData, addedDischargeData, addedDoctorData}

        return addedData
    } 



















    async updateReport(reportData: Report, id:string): Promise <Report>{
        return reportData
    }

    async deleteReport(id:string): Promise <string>{
        return id
    }


}


export default ReportPrismaRepository;