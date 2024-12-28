export interface Report {
    personal_data: PersonalData;
    doctor_data: DoctorData;
    discharge_data: DischargeData;
    entry_data: EntryData;
    procedure_data: ReportData;
}   

export interface PersonalData{
    patient_id: string;
    last_name: string;
    first_name: string;
    age: string;
    city: string;
    sex: string;
    birthdate: Date;
    cpf: string;
    mother_name: string;
    relative_name: string;
    relative_first_name: string;
    familiar_stand: string;
    phone: string;
}

export interface DoctorData {
    doctor_id: string;
    doctor_name: string;
    doctor_first_name: string;
}

export interface DischargeData{
    discharge_id: string;
    discharge_date: Date;
    discharge_cause: string;
    discharge_note: string;
}

export interface EntryData{
    entry_id: string;
    entry_date: Date;
    symptoms: string;
    previous_diagnosis: string;
    clinical_conditions: string;
    entry_note: string;
}
    
export interface ReportData{
    procedure_id: string;
    report_code: string;
    procedure_name: string;
    bed: string;
    procedure_status: string;
    report_note: string;
    procedure_date: Date;
    patient_id: string;
    doctor_id: string;
    entry_id: string;
    discharge_id: string;
}