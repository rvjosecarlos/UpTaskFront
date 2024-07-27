import { isAxiosError } from "axios";
import { api } from "@/lib/axios";
import { CheckPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export const createAccount = async ( formData: UserRegistrationForm ) => {
    try{
        const url = `/auth/create-account`;
        const { data } = await api.post<string>(url, formData);
        return data;
    }
    catch( error ){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    }
};

export const confirmAccount = async ( token: ConfirmToken['token'] ) => {
    try{
        const url = `/auth/confirm-account`;
        const { data } = await api.post(url, { token });
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};

export const requestConfirmationCode = async ( email: RequestConfirmationCodeForm['email'] ) => {
    try{
        const url = `/auth/request-token`;
        const { data } = await api.post(url, { email });
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};

export const authenticateUser = async ( formData: UserLoginForm ) => {
    try{
        const url = `/auth/login`;
        const { data } = await api.post(url, formData);
        return data;

    }
    catch(error){
        if(isAxiosError(error) && error.response){
            const msgError: string | [{
                msg: string
            }] = error.response.data.error;
            if (typeof msgError === 'string'){
                throw new Error(msgError);
            }
            else if(Array.isArray(msgError)){
                const msgComplete = msgError[0].msg;
                throw new Error(msgComplete);
            }
        }
    };
};

export const forgotPassword = async ( email: ForgotPasswordForm ) => {
    try{
        const url = `/auth/forgot-password`;
        const { data } = await api.post(url, email);
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            const msgError: string | [{
                msg: string
            }] = error.response.data.error;
            if (typeof msgError === 'string'){
                throw new Error(msgError);
            }
            else if(Array.isArray(msgError)){
                const msgComplete = msgError[0].msg;
                throw new Error(msgComplete);
            }
        }
    }
};

export const validateToken = async ( token: ConfirmToken['token'] ) => {
    try{
        const url = `/auth/validate-token`;
        const { data } = await api.post(url, { token });
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            const msgError: string | [{
                msg: string
            }] = error.response.data.error;
            if (typeof msgError === 'string'){
                throw new Error(msgError);
            }
            else if(Array.isArray(msgError)){
                const msgComplete = msgError[0].msg;
                throw new Error(msgComplete);
            }
        }
    }
};

export const updatePasswordWithToken = async ( { formData, token }: { formData: NewPasswordForm, token: string } ) => {
    try{
        const url = `/auth/new-password/${token}`;
        const { data } = await api.post(url, formData );
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            const msgError: string | [{
                msg: string
            }] = error.response.data.error;
            if (typeof msgError === 'string'){
                throw new Error(msgError);
            }
            else if(Array.isArray(msgError)){
                const msgComplete = msgError[0].msg;
                throw new Error(msgComplete);
            }
        }
    };
};

export const getUserData = async () => {
    try{
        const url = `/auth/user`;
        const { data } = await api.get(url);
        return data;
    }
    catch( error ){
        if(isAxiosError(error) && error.response){
            const msgError: string | [{
                msg: string
            }] = error.response.data.error;
            if (typeof msgError === 'string'){
                throw new Error(msgError);
            }
            else if(Array.isArray(msgError)){
                const msgComplete = msgError[0].msg;
                throw new Error(msgComplete);
            }
        }
    }
};

export const checkPassword = async ( formData: CheckPasswordForm ) => {
    try{
        const url = `/auth/checkPassword`;
        const { data } = await api.post(url, formData);
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
};