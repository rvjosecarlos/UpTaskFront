import { deleteNote } from "@/api/noteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { dateFormat } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
    nota: Note
};

export function NoteDetail( { nota }: NoteDetailProps){

    const { data, isLoading, error } = useAuth();
    const canDelete = useMemo( ()=> data?._id === nota.createdBy._id, [data]);

    
    const param = useParams();
    const projectId = param.projectId!;
    
    const queryParams = new URLSearchParams(location.search);  
    const taskId = queryParams.get('viewTask')!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);            
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] });
        }
    });
    if(isLoading) return "Cargando...";
    if(error) return <Navigate to={"/404"} />
    if(data) return (
        <div className="flex justify-between border-t-2 border-slate-100 space-y-3 p-2">
            <div>
                <p>{nota.content}<span className="font-bold">{` - ${nota.createdBy.name}`}</span></p>
                <p className="text-xs">{dateFormat(nota.createdAt)}</p>
            </div>
            {
                canDelete &&
                <button
                    onClick={()=>mutate({ projectId, taskId, noteId: nota._id })}
                    className="p-2 bg-red-600 text-white"
                >
                    Eliminar
                </button>
            }
        </div>
    );
}