import { Report } from "../Models/Reports";
import ejs, { resolveInclude } from "ejs";
import html_pdf from "html-pdf"

class PDFGeneratorService{

    async generate(data: Report): Promise <any> { 

        ejs.renderFile("./src/Services/ReportPDF/index.ejs", {
            
            name: data.personal_data.name,
            first_name: data.personal_data.first_name,
            age: data.personal_data.age,
            city: data.personal_data.city,
            sex: data.personal_data.sex,
            birth: data.personal_data.birth,
            cpf: data.personal_data.cpf,
            mother_name: data.personal_data.mother_name,
            relative_name: data.personal_data.relative_name,
            relative_first_name: data.personal_data.relative_first_name,
            familiar_stand: data.personal_data.familiar_stand,
            phone: data.personal_data.phone,
            doctor_name: data.doctor_data.doctor_name,
            doctor_first_name: data.doctor_data.doctor_first_name,
            discharge_date: data.discharge_data.discharge_date,
            discharge_cause: data.discharge_data.discharge_cause,
            discharge_note: data.discharge_data.discharge_note,
            entry_date: data.entry_data.entry_date,
            symptoms: data.entry_data.symptoms,
            previous_diagnosis: data.entry_data.previous_diagnosis,
            clinical_conditions: data.entry_data.clinical_conditions,
            entry_note: data.entry_data.entry_note,
            report_code: data.procedure_data.report_code,
            procedure: data.procedure_data.procedure,
            bed: data.procedure_data.bed,
            procedure_status: data.procedure_data.procedure_status,
            procedure_note: data.procedure_data.procedure_note,
            procedure_date: data.procedure_data.procedure_date

        }, (error, html) =>{
            if(error){
                console.log(error); 
            } else {
                html_pdf.create(html, {}).toFile(`./public/reports/${data.procedure_data.report_code}_Prontuario.pdf`, (error, res) =>{
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