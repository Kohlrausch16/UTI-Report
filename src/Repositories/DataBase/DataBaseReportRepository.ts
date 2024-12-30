import dotenv from "dotenv";
import { Report, EntryData, DischargeData, PersonalData, ReportData, DoctorData } from "../../Models/Reports";
import { reportDataExtraction, personalDataExtraction, doctorDataExtraction } from "./Helpers/DataExtractorHelper"; 
import { outputData } from "./Helpers/OutputDataHelper";

dotenv.config();
const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONECTION_STRING);
console.log("Conetando com o banco...");

class DatabaseRepository {
  async getReports(): Promise<any> {
    const allData: any = await client.query(`
            SELECT
            reports.*,
            patient.*,
            doctor.*,
            entry.*,
            discharge.*
    
            from reports
            inner join patient
                on reports.patient_id = patient.patient_id
            inner join doctor
                on reports.doctor_id = doctor.doctor_id
            inner join entry
                on reports.entry_id = entry.entry_id
            inner join discharge
                on reports.discharge_id = discharge.discharge_id;`);
      
    const foundData: Report[] = await outputData(allData[0]);
    return foundData;
  }

  async getReportByCode(code: string): Promise<Report> {
    const data = await this.getReports();
    const foundReport: Report | undefined = data.find((item: any) =>{
      return item.procedure_data.report_code === code
    });

    if (!foundReport) {
      throw new Error(`Código ${code} não encontrado!`);
    }

    return foundReport;
  }

  async getReportById(id: string): Promise<Report> {
    const data = await this.getReports();
    const foundReport: Report | undefined = data.find((item: any) =>{
      return item.procedure_data.procedure_id === id
    });

    if (!foundReport) {
      throw new Error(`Prontuário ${id} não encontrado!`);
    }
    return foundReport;
  }


  async addReport(data: Report): Promise<Report> {

      const dataBaseData = await this.getReports();

      const ifPatientExists: Report | undefined = dataBaseData.find((item: any) => {
        return item.personal_data.cpf === data.personal_data.cpf;
      });

      const ifDoctorExists: Report | undefined = dataBaseData.find((item: any) => {
        return item.doctor_data.doctor_id === data.procedure_data.doctor_id;
      });

      const ifReportExists: Report | undefined = dataBaseData.find((item: any) => {
        return item.procedure_data.report_code === data.procedure_data.report_code;
      });

      if(ifReportExists !== undefined){
        throw new Error (`Prontuário ${data.procedure_data.report_code} já existente!`);
      }

      if(ifPatientExists === undefined){
        const patient_values = await personalDataExtraction(data as Report);
        console.log(patient_values);

        const addedPatient: PersonalData = await client.query(
          `INSERT INTO patient
            (patient_id, last_name, first_name, age, city, sex, birthdate, cpf, mother_name, relative_name, relative_first_name, familiar_stand, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, patient_values);
      } else {
          data.personal_data.patient_id = ifPatientExists.personal_data.patient_id;
          console.log('Chegou aqui!!!')
          console.log(data.personal_data);
      }

      if(ifDoctorExists === undefined){
        const doctor_values = await doctorDataExtraction(data as Report);

        const addedDoctor: DoctorData = await client.query(
        `INSERT INTO doctor 
            (doctor_id, doctor_name, doctor_first_name)
             VALUES (?, ?, ?);`, doctor_values);
      } else {
          data.doctor_data.doctor_id = ifDoctorExists.doctor_data.doctor_id;
      }

      const {discharge_values, entry_values, report_values} = await reportDataExtraction(data as Report);
        
      const addedEntry: EntryData = await client.query(
        `INSERT INTO entry
          (entry_id, entry_date, symptoms, previous_diagnosis, clinical_conditions, entry_note) 
          VALUES (?, ?, ?, ?, ?, ?); `, entry_values);

      const addedDischarge: DischargeData = await client.query(
        ` INSERT INTO discharge
              (discharge_id, discharge_date, discharge_cause, discharge_note) 
              VALUES (?, ?, ?, ?);`, discharge_values);

      const addedReport: ReportData = await client.query(
      `INSERT INTO reports
        (procedure_id, report_code, procedure_name, bed, procedure_status, procedure_date, report_note, patient_id, doctor_id, entry_id, discharge_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, report_values);

      const report = {entry_values, discharge_values, report_values};
  
      return this.getReportByCode(data.procedure_data.report_code);
  }

  async updateReport(data: Report, id: string): Promise<any> {

    const foundData: Report = await this.getReportById(id);
    
    const patient_values: any = await personalDataExtraction(data as Report);
    const doctor_values = await doctorDataExtraction(data as Report);
    const {entry_values, discharge_values, report_values} = await reportDataExtraction(data as Report);

    
    patient_values.shift();
    patient_values.push(foundData.personal_data.patient_id);
    report_values.shift();
    for (let i = 1; i <= 4; i++){
      report_values.pop()
    }
    report_values.push(foundData.procedure_data.procedure_id);
    doctor_values.shift();
    doctor_values.push(foundData.doctor_data.doctor_id);
    entry_values.shift();
    entry_values.push(foundData.entry_data.entry_id);
    discharge_values.shift();
    discharge_values.push(foundData.discharge_data.discharge_id);
    
    const updatedPatientData = await client.query(`UPDATE patient SET 
    last_name=?, first_name=?, age=?, city=?, sex=?, birthdate=?, cpf=?, mother_name=?, relative_name=?, relative_first_name=?, familiar_stand=?, phone=? WHERE patient_id=?;`, patient_values);

    const updatedDoctorData = await client.query(`UPDATE doctor SET 
      doctor_name=?, doctor_first_name=? WHERE doctor_id=?`, doctor_values);

    const updatedEntryData = await client.query(`UPDATE entry SET 
    entry_date=?, symptoms=?, previous_diagnosis=?, clinical_conditions=?, entry_note=? WHERE entry_id=?;`, entry_values);

    const updatedDischargeData = await client.query(`UPDATE discharge SET 
      discharge_date=?, discharge_cause=?, discharge_note=? WHERE discharge_id=?;`, discharge_values);

    const updatedReportData = await client.query(`UPDATE reports SET 
      report_code=?, procedure_name=?, bed=?, procedure_status=?, procedure_date=?, report_note=? WHERE procedure_id=?;`, report_values);

    const updatedReport: any = {updatedReportData, updatedPatientData, updatedDoctorData, updatedEntryData, updatedDischargeData}

    return await this.getReportByCode(data.procedure_data.report_code);
  }

  async deleteReport(id: string): Promise<string> {
      const foundData: Report = await this.getReportById(id);
      await client.query(`DELETE FROM reports WHERE procedure_id = ?`, id);
      return `Registro deletado`;
  }
}

export default DatabaseRepository;
