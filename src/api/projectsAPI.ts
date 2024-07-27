import { isAxiosError } from "axios";
import { api } from "@/lib/axios";
import { ProjectFormData, DashboardProjectSchema, Project, ProjectSchema } from "@/types/index";

export const createProject = async (formData: ProjectFormData) => {
    try{
        const { data } = await api.post<string>('/projects', formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error)
        };
    };
};

export const getProjects = async () => {
    try{
        const { data } = await api.get('/projects');
        const result = DashboardProjectSchema.safeParse(data);
        if( result.success ){
            return result.data;
        };
        throw new Error('');
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        }
        else if(error){
            throw new Error('Error de respuesta de servidor');
        }
    }
};

export const getProjectById = async ( projectId: Project['_id'] ) => {
    try{
        const url = `/projects/${projectId}`;
        const { data } = await api.get(url);
        const result = ProjectSchema.safeParse(data);
        if( result.success ){
            return result.data;
        }
        else{
            console.log('Error en el esquema', result.error.message);
        }
        
        throw new Error('');
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        }
        else if(error){
            throw new Error('Error de respuesta de servidor');
        }
    };
};

type updateProjectTypes = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export const updateProject = async ({ formData, projectId }: updateProjectTypes) => {
    try{
        const url = `/projects/${projectId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};

export const deleteProject = async ( projectId: Project['_id'] ) => {
    try{
        const url = `/projects/${projectId}`;
        const { data } = await api.delete<string>(url);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};