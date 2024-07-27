import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteDataForm, Project, Task } from "../types";

type NoteDataType = {
    projectId: Project['_id'],
    taskId: Task['_id'],
    formData: NoteDataForm,
    noteId: Note['_id']
}

export const addNote = async ({ projectId, taskId, formData }: Pick<NoteDataType, 'projectId' | 'taskId' | 'formData'>) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post(url, formData);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};

export const deleteNote = async ({projectId, taskId, noteId}: Pick<NoteDataType, 'projectId' | 'taskId' | 'noteId'>) => {
    try{
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete<string>(url);
        return data;
    }
    catch(error){
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error);
        };
    };
};