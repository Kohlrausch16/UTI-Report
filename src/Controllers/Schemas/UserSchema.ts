import { array, object, string, boolean } from "yup";


export const userSchema = object().shape({

    user_role: string().required('O campo user_role é obrigatório!'), 
    email: string().email("Por favor, insira um email válido").required("O campo e-mail é obrigatório!"),
    password: string().min(8, "A senha deve conter no mínimo 8 caracteres").max(8, "A senha deve conter no máximo 8 caracteres").required(),
});

export const roleSchema = object().shape({

    user_role: string().required(),
    permissions: object().shape({
        getReports: boolean(). required(),
        getReportByCode: boolean(). required(),
        addReport: boolean(). required(),
        updateReport: boolean(). required(),
        deleteReport: boolean(). required(),
        generate: boolean(). required(),
    })
});
