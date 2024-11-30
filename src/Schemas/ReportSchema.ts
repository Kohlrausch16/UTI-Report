import {object, string } from "yup";


export const reportDataSchema = object().shape({
    name: string().required(),
    first_name: string().required(),
    age: string().required(),
    city: string().required(),
    sex: string().test('isValid', (sex) => {
        if (sex !== 'mal' && sex !== 'fem'){
            return false
        } return true
    }).required(),
    birth: string().required(),
    cpf: string().min(11).max(11).required(),
    mother_name: string().required()
});
