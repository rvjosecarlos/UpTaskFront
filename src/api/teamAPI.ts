import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamUsersSchema, teamUserSchema } from "../types";

export const getMembers = async ( projectId: Project['_id'] ) => {
    try{
        const url = `/projects/${projectId}/team`;
        const { data } = await api.get(url);
        const result = teamUsersSchema.safeParse(data);
        if( result.success ){
            return result.data;
        };
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

export const findMemberById = async ( { formData, projectId }: { formData: TeamMemberForm, projectId: Project['_id'] } ) => {
    try{
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        const result = teamUserSchema.safeParse(data);
        if( result.success ){
            return result.data;
        };
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
    };
};

export const addMember = async ( { userId, projectId }: { userId: TeamMember['_id'], projectId: Project['_id'] } ) => {
    try{
        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<string>(url, {id: userId});
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

export const deleteMember = async ( { userId, projectId }: { userId: TeamMember['_id'], projectId: Project['_id'] } ) => {
    try{
        const url = `/projects/${projectId}/team/${userId}`;
        const { data } = await api.delete<string>(url);
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