
export interface AuthToken{
    email: string;
    password: string;
}

export interface AuthRefreshToken{
    token: string;
    refresh_token: string;
}
