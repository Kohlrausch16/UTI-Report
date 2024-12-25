import { Report } from "../Models/Reports";
import ejs from "ejs";
import html_pdf from "html-pdf"

class PDFGeneratorService{

    async generate(data: any): Promise <any> { 

        ejs.renderFile("./src/Services/ReportPDF/index.ejs", {
            
            name: data.last_name,
            first_name: data.first_name,
            age: data.age,
            city: data.city,
            sex: data.sex,
            birth: data.birthdate,
            cpf: data.cpf,
            mother_name: data.mother_name,
            relative_name: data.relative_name,
            relative_first_name: data.relative_first_name,
            familiar_stand: data.familiar_stand,
            phone: data.phone,
            doctor_name: data.doctor_name,
            doctor_first_name: data.doctor_first_name,
            discharge_date: data.discharge_date,
            discharge_cause: data.discharge_cause,
            discharge_note: data.discharge_note,
            entry_date: data.entry_date,
            symptoms: data.symptoms,
            previous_diagnosis: data.previous_diagnosis,
            clinical_conditions: data.clinical_conditions,
            entry_note: data.entry_note,
            report_code: data.report_code,
            procedure: data.procedure_name,
            bed: data.bed,
            procedure_status: data.procedure_status,
            procedure_note: data.report_note,
            procedure_date: data.procedure_date

        }, (error, html) =>{
            if(error){
            } else {
                html_pdf.create(html, {}).toFile(`./public/reports/${data.report_code}_prontuario.pdf`, (error, res) =>{
                    if(error){
                        return error
                    } else {
                        return File;
                    }
                });
            }
        });
    }
}


export default PDFGeneratorService;