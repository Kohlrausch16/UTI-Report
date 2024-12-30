import { Report } from "../../../Models/Reports";

export function reportDataExtraction(data: Report){

    const entry_values = [
        data.entry_data.entry_id,
        data.entry_data.entry_date,
        data.entry_data.symptoms,
        data.entry_data.previous_diagnosis,
        data.entry_data.clinical_conditions,
        data.entry_data.entry_note
    ];
      
    const discharge_values = [
        data.discharge_data.discharge_id,
        data.discharge_data.discharge_date,
        data.discharge_data.discharge_cause,
        data.discharge_data.discharge_note,
    ];
        
 
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

    const extractedData = {entry_values, discharge_values, report_values};
    return extractedData;
}

export function personalDataExtraction(data: Report){

    const patient_values = [
        data.personal_data.patient_id,
        data.personal_data.last_name,
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
    return patient_values;
}

export function doctorDataExtraction(data: Report){

    const doctor_values = [
        data.doctor_data.doctor_id,
        data.doctor_data.doctor_name,
        data.doctor_data.doctor_first_name,
    ];

    return doctor_values;
}


