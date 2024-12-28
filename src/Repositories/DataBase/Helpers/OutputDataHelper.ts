import { DischargeData, DoctorData, EntryData, PersonalData, Report, ReportData } from "../../../Models/Reports";

export function outputData(data: any): Report[]{

    const foundData = data.map((item: any) =>{
        let patient_id = item.patient_id;
        let last_name = item.last_name;
        let first_name = item.first_name;
        let age = item.age;
        let city = item.city;
        let sex = item.sex;
        let birthdate = item.birthdate;
        let cpf = item.cpf;
        let mother_name = item.mother_name;
        let relative_name = item.relative_name;
        let relative_first_name = item.relative_first_name;
        let familiar_stand = item.familiar_stand;
        let phone = item.phone;
        let personal_data: PersonalData = {patient_id, last_name, first_name, age, city, sex, birthdate, cpf, mother_name, relative_name, relative_first_name, familiar_stand, phone}
        let doctor_id = item.doctor_id;
        let doctor_name = item.doctor_name
        let doctor_first_name = item.doctor_first_name
        let doctor_data: DoctorData = {doctor_id, doctor_name, doctor_first_name}
        let entry_id = item.entry_id;
        let entry_date = item.entry_date;
        let symptoms = item.symptoms;
        let previous_diagnosis = item.previous_diagnosis;
        let clinical_conditions = item.clinical_conditions;
        let entry_note = item.entry_note;
        let entry_data: EntryData = {entry_id, entry_date, symptoms, previous_diagnosis, clinical_conditions, entry_note}
        let discharge_id = item.discharge_id;
        let discharge_date = item.discharge_date;
        let discharge_cause = item.discharge_cause;
        let discharge_note = item.discharge_note;
        let discharge_data: DischargeData = {discharge_id, discharge_date, discharge_cause, discharge_note}
        let procedure_id = item.procedure_id;
        let report_code = item.report_code;
        let procedure_name = item.procedure_name;
        let bed = item.bed;
        let procedure_status = item.procedure_status;
        let procedure_date = item.procedure_date;
        let report_note = item.report_note;
        let procedure_data: ReportData = {procedure_id, report_code, procedure_name, bed, procedure_status, procedure_date, report_note, patient_id, doctor_id, entry_id, discharge_id}
        const report_data = {procedure_data, personal_data, doctor_data, entry_data, discharge_data} 
        return report_data
    });
    
    return foundData

}