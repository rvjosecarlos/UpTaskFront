import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { NoteDataForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/api/noteAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function NoteForm(){

    const initialValues = {
        content: ''
    };

    const param = useParams();
    const queryParams = new URLSearchParams(location.search);

    const projectId = param.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset();
            toast.success(data);            
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] });
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleCrearNota = (formData: NoteDataForm) => mutate({ projectId, taskId, formData });

    return (
        <form
            onSubmit={handleSubmit(handleCrearNota)}
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="crear-nota"
                    className="font-bold"
                >
                    Crear Nota
                </label>
                <input 
                    id="content"
                    type="text" 
                    placeholder="Contenido de la nota"
                    className="w-full p-2 border-2 border-slate-100"
                    {
                        ...register("content", {
                            required: "El contenido de la nota es obligatorio"                            
                        })
                    }
                />
                { errors.content && <ErrorMessage>{ errors.content.message }</ErrorMessage> }
            </div>
            <input 
                type="submit"
                value="Crear Nota"
                className="mt-2 w-full bg-fuchsia-700 hover:bg-fuchsia-900 text-white text-lg font-bold transition-colors cursor-pointer p-2"
            />
        </form>
    );
};