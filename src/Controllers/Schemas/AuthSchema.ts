import { object, string } from "yup";

export const authTokenSchema = object().shape({
    email: string().email('Favor informar um e-mail válido!').required('É necessário infromar um e-mail!'),
    password: string().required('è necessa´rio informar uma senha!')
});

export const authRefreshTokenSchema = object().shape({
    token: string().required('Token é obrigatório!'),
    refresh_token: string().required('RefreshToken é obrigatório!')
});