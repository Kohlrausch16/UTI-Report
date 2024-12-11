import yup, {object, string } from "yup";


export const reportDataSchema = object().shape({
    personal_data: object().shape({
        name: string().required("Name is a required field!"),
        first_name: string().required("First name is a required field!"),
        age: string().required("Age is a required field!"),
        city: string().required("City is a required field!"),
        sex: string().lowercase().test('isValid', (sex) => {
            if (sex !== 'mal' && sex !== 'fem'){
                return false
            } return true
        }).required("Sex is a required field!"),
        birth: string().required("Birthdate is a required field!"),
        cpf: string().min(11).max(11).required("CPF is a required field!"),
        mother_name: string().required("Mother name is a required field!"),
        relative_name: string().required("Relative name is a required field!"),
        relative_first_name: string().required("Relative first name is a required field!"),
        familiar_stand: string().required("Familiar stand is a required field!"),
        phone: string().length(11).required("Phone is a required field!"),
    }),

    doctor_data: object().shape({
        doctor_name: string().required("Doctor name is a required field!"),
        doctor_first_name: string().required("Doctor first name is a required field!"),
    }),

    discharge_data: object().shape({
        discharge_date: string().required("Discharge date is a required field!"),
        discharge_cause: string().required("Discharge cause is a required field!"),
        discharge_note: string().nullable(),
        
    }),

    entry_data: object().shape({
        entry_date: string().required("Entry date is a required field!"),
        symptoms: string().nullable(),
        previous_diagnosis: string().nullable(),
        clinical_conditions: string().nullable(),
        entry_note: string().nullable(),
    }),

    procedure_data: object().shape({
        report_code: string().length(12).required("Report code is a required field!"),
        procedure: string().required("Procedure is a required field!"),
        bed: string().required("Bed identifier is a required field!"),
        procedure_status: string().nullable(),
        procedure_note: string().nullable(),
        procedure_date: string().required("Procedure date is a required field!")
    })
});

