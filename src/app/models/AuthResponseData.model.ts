export interface AuthResponseData{
    email: string;
    expiresIn: string;
    idToken: string;
    localId: string;
    refreshToken: string;
    registered?: boolean;    
}