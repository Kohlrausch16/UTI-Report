
export interface User{
    user_id?: string,
    user_role: string;
    email: string,
    password: string;
}

export interface UserRole{
    user_role_id: string;
    user_role: string;
    permissions: {
        getReports: boolean;
        getReportByCode: boolean;
        addReport: boolean
        updateReport: boolean;
        deleteReport: boolean;
        generate: boolean;
    }
}
