import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { ChangePasswordForm, UserDataProfile } from "../types";

export const updateProfile = async ( formData : UserDataProfile ) => {
    try{
        const url = `/auth/profile/update-profile`;
        const { data } = await api.put<string>(url, formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        }
    }
}

export const updatePassword = async ( formData: ChangePasswordForm ) => {
    try{
        const url = '/auth/profile/update-password';
        const { data } = await api.put<string>(url, formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        }
    }
};