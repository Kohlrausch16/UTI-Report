export interface Report {
    personal_data: PerosnalData;
    doctor_data: DoctorData;
    discharge_data: DischargeData;
    entry_data: EntryData;
    procedure_data: ReportData;
}   

export interface PerosnalData{
    patient_id: string;
    name: string;
    first_name: string;
    age: string;
    city: string;
    sex: string;
    birth: string;
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
    discharge_date: string;
    discharge_cause: string;
    discharge_note: string;
}

export interface EntryData{
    entry_id: string;
    entry_date: string;
    symptoms: string;
    previous_diagnosis: string;
    clinical_conditions: string;
    entry_note: string;
}
    
export interface ReportData{
    report_id: string;
    report_code: string;
    procedure: string;
    bed: string;
    procedure_status: string;
    procedure_note: string;
    procedure_date: string;
}