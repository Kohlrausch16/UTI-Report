import { object, string } from "yup";


export const userSchema = object().shape({

    user_role: string().required('O campo user_role é obrigatório!'), 
    email: string().email("Por favor, insira um email válido").required("O campo e-mail é obrigatório!"),
    password: string().min(8, "A senha deve conter no mínimo 8 caracteres").max(8, "A senha deve conter no máximo 8 caracteres").required()

});