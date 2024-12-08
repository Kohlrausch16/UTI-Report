import { Report } from "../Models/Reports";
import ejs, { resolveInclude } from "ejs";
import html_pdf from "html-pdf"

class PDFGeneratorService{

    async generate(data: Report): Promise <any> { 

        ejs.renderFile("./src/Services/ReportPDF/index.ejs", {
            
            name: data.name,
            first_name: data.first_name,
            age: data.age,
            city: data.city,
            sex: data.sex,
            birth: data.birth,
            cpf: data.cpf,
            mother_name: data.mother_name,
            relative_name: data.relative_name,
            relative_first_name: data.relative_first_name,
            familiar_stand: data.familiar_stand,
            phone: data.phone,
            report_code: data.report_code,
            procedure: data.procedure,
            bed: data.bed,
            procedure_status: data.procedure_status,
            doctor_name: data.doctor_name,
            doctor_first_name: data.doctor_first_name,
            procedure_date: data.procedure_date

        }, (error, html) =>{
            if(error){
                console.log(error); 
            } else {
                html_pdf.create(html, {}).toFile(`./public/reports/${data.report_code}_Prontuario.pdf`, (error, res) =>{
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