import dotenv from "dotenv";
import { Report, EntryData, DischargeData, PersonalData, ReportData, DoctorData } from "../../Models/Reports";

dotenv.config();
const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONECTION_STRING);
console.log("Conetando com o banco...");

class DatabaseRepository {
  async getReports(): Promise<any> {
    const allData: Report[] = await client.query(`
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

    delete allData[1];
    return allData;
  }

  async getReportByCode(code: string): Promise<Report> {
    const data = await this.getReports();

    const foundReport = data[0].find((item: any) =>{
      return item.report_code === code
    });

    if (!foundReport) {
      throw new Error(`Código ${code} não encontrado!`);
    }

    return foundReport;
  }

  async getReportById(id: string): Promise<Report> {
    const ifReportExists = await client.query(
      `Select * from reports where procedure_id = ?`,id);

    if (ifReportExists[0].length === 0) {
      throw new Error(`Código ${id} não encontrado!`);
    }

    const foundReport = ifReportExists[0][0]

    return foundReport;
  }


  async addReport(data: Report): Promise<Report> {

      const dataBaseData = await this.getReports();

      const ifPatientDoesntExist: any = dataBaseData[0].find((item: any) => {
            return item.cpf === data.personal_data.cpf;
      });

      if(ifPatientDoesntExist === undefined){
        const patient_values = [
          data.personal_data.patient_id,
          data.personal_data.name,
          data.personal_data.first_name,
          data.personal_data.age,
          data.personal_data.city,
          data.personal_data.sex,
          data.personal_data.birthdate,
          data.personal_data.cpf,
          data.personal_data.mother_name,
          data.personal_data.relative_name,
          data.personal_data.relative_first_name,
          data.personal_data.familiar_stand,
          data.personal_data.phone,
        ];
    
        const addedPatient: PersonalData = await client.query(
          `INSERT INTO patient
                (patient_id, last_name, first_name, age, city, sex, birthdate, cpf, mother_name, relative_name, relative_first_name, familiar_stand, phone)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, patient_values);

      } else {
        data.personal_data.patient_id = ifPatientDoesntExist.patient_id
      }

    const entry_values = [
      data.entry_data.entry_id,
      data.entry_data.entry_date,
      data.entry_data.symptoms,
      data.entry_data.previous_diagnosis,
      data.entry_data.clinical_conditions,
      data.entry_data.entry_note,
    ];

    const addedEntry: EntryData = await client.query(
      `INSERT INTO entry
        (entry_id, entry_date, symptoms, previous_diagnosis, clinical_conditions, entry_note) 
        VALUES (?, ?, ?, ?, ?, ?); `, entry_values);

    const discharge_values = [
      data.discharge_data.discharge_id,
      data.discharge_data.discharge_date,
      data.discharge_data.discharge_cause,
      data.discharge_data.discharge_note,
    ];

    const addedDischarge: DischargeData = await client.query(
      ` INSERT INTO discharge
            (discharge_id, discharge_date, discharge_cause, discharge_note) 
            VALUES (?, ?, ?, ?);`, discharge_values);

    const doctor_values = [
      data.doctor_data.doctor_id,
      data.doctor_data.doctor_name,
      data.doctor_data.doctor_first_name,
    ];

    const addedDoctor: DoctorData = await client.query(
      `INSERT INTO doctor 
            (doctor_id, doctor_name, doctor_first_name)
             VALUES (?, ?, ?);`, doctor_values);


    const report_values = [
      data.procedure_data.procedure_id,
      data.procedure_data.report_code,
      data.procedure_data.procedure_name,
      data.procedure_data.bed,
      data.procedure_data.procedure_status,
      data.procedure_data.procedure_date,
      data.procedure_data.report_note,
      data.personal_data.patient_id,
      data.doctor_data.doctor_id,
      data.entry_data.entry_id,
      data.discharge_data.discharge_id,
    ];

    const addedReport: ReportData = await client.query(
      `INSERT INTO reports
            (procedure_id, report_code, procedure_name, bed, procedure_status, procedure_date, report_note, patient_id, doctor_id, entry_id, discharge_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, report_values);

    return this.getReportByCode(data.procedure_data.report_code);
  }

  async updateReport(data: Report, id: string): Promise<Report> {

    const foundData: any = await this.getReportById(id);

    const patient_values = [
      data.personal_data.name,
      data.personal_data.first_name,
      data.personal_data.age,
      data.personal_data.city,
      data.personal_data.sex,
      data.personal_data.birthdate,
      data.personal_data.cpf,
      data.personal_data.mother_name,
      data.personal_data.relative_name,
      data.personal_data.relative_first_name,
      data.personal_data.familiar_stand,
      data.personal_data.phone,
      foundData.patient_id
    ];

  
    const updatedPatientData = await client.query(`UPDATE patient SET 
    last_name=?, first_name=?, age=?, city=?, sex=?, birthdate=?, cpf=?, mother_name=?, relative_name=?, relative_first_name=?, familiar_stand=?, phone=? WHERE patient_id=?`, patient_values);


    const entry_values = [
      data.entry_data.entry_date,
      data.entry_data.symptoms,
      data.entry_data.previous_diagnosis,
      data.entry_data.clinical_conditions,
      data.entry_data.entry_note,
      foundData.entry_id
    ];
  
    const updatedEntryData = await client.query(`UPDATE entry SET 
    entry_date=?, symptoms=?, previous_diagnosis=?, clinical_conditions=?, entry_note=? WHERE entry_id=?`, entry_values);

    
    const discharge_values = [
      data.discharge_data.discharge_date,
      data.discharge_data.discharge_cause,
      data.discharge_data.discharge_note,
      foundData.discharge_id
    ];

    const updatedDischargeData = await client.query(`UPDATE discharge SET 
      discharge_date=?, discharge_cause=?, discharge_note=? WHERE discharge_id=?`, discharge_values);

    const doctor_values = [
      data.doctor_data.doctor_name,
      data.doctor_data.doctor_first_name,
      foundData.doctor_id
    ];
  
      const updatedDoctorData = await client.query(`UPDATE doctor SET 
        doctor_name=?, doctor_first_name=? WHERE doctor_id=?`, doctor_values);

    const report_values = [
      data.procedure_data.report_code,
      data.procedure_data.procedure_name,
      data.procedure_data.bed,
      data.procedure_data.procedure_status,
      data.procedure_data.procedure_date,
      data.procedure_data.report_note,
      foundData.patient_id,
      foundData.doctor_id,
      foundData.entry_id, 
      foundData.discharge_id,
      foundData.procedure_id
    ];

    const updatedReportData = await client.query(`UPDATE reports SET 
      report_code=?, procedure_name=?, bed=?, procedure_status=?, procedure_date=?, report_note=?, patient_id=?, doctor_id=?, entry_id=?, discharge_id=? WHERE procedure_id=?`, report_values);
   

    return await this.getReportByCode(data.procedure_data.report_code);
  }

  async deleteReport(id: string): Promise<string> {

      const foundData: Report = await this.getReportById(id);

      await client.query(`DELETE FROM reports WHERE procedure_id = ?`, id);

      return `Registro deletado`;
  }
}

export default DatabaseRepository;
