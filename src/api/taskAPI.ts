import { api } from "@/lib/axios";
import { TaskFormData, Project, Task, taskSchema } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    taskStatus: Task['taskStatus']
}

export const createTask = async ({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>) => {
    try{
        const url = `/projects/${projectId}/task`;
        const { data } = await api.post<string>(url, formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            console.log(error.response.data.error);
            throw new Error(error.response.data.error);
        };
    };
};

export const getTaksById = async ({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get(url);
        const result = taskSchema.safeParse(data);
        if( result.success ){
            return result.data;
        }
        else{
            throw new Error(result.error.errors[0].message);
        };
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            console.log('AXIOS ERROR');
            console.log(error.response.data.error);
            throw new Error(error.response.data.error);
        }
        else{
            throw new Error('Error' + error);
        }
    };
};

export const updateTask = async ({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        };
    };
};

export const deleteTask = async ({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'> ) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
};

export const updateTaskStatus = async ({projectId, taskId, taskStatus}: Pick<TaskAPI, 'projectId' | 'taskId' | 'taskStatus'>) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}/`;
        const { data } = await api.patch<string>(url, { taskStatus });
        return data;
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        };
    }
};