import {object, string } from "yup";


export const reportDataSchema = object().shape({
    name: string().required(),
    first_name: string().required(),
    age: string().required(),
    city: string().required(),
    sex: string().lowercase().test('isValid', (sex) => {
        if (sex !== 'mal' && sex !== 'fem'){
            return false
        } return true
    }).required(),
    birth: string().required(),
    cpf: string().min(11).max(11).required(),
    mother_name: string().required(),
    relative_name: string().required(),
    relative_first_name: string().required(),
    familiar_stand: string().required(),
    phone: string().length(11).required(),
    record_code: string().length(12).required(),
    procedure: string().required(),
    bed: string().required(),
    procedure_status: string().nullable(),
    doctor_name: string().required(),
    doctor_first_name: string().required(),
    procedure_date: string().required()
});


export const reportCodeSchema = object().shape({
    report_code: string().length(12).required()
});