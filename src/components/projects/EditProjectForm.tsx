import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/projectsAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
};

export default function EditProjectForm({ data, projectId } : EditProjectFormProps){

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (resApi) => {
            queryClient.invalidateQueries({ queryKey:['editProject'] });
            toast.success(resApi);
            navigate('/');
        }
    });

    const handleForm = (formData: ProjectFormData) => mutate({ formData, projectId });

    return (
        <>
            <h1 className="text-5xl font-black">Actualizar proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5 pb-5">Llena el siguiente formulario para actualizar el proyecto</p>
            <nav className="my-5">
                <Link 
                    className="bg-purple-500 hover:bg-purple-700 px-10 py-3 text-xl text-white uppercase font-bold cursor-pointer transition-colors"
                    to='/'
                >
                    Volver a proyectos
                </Link>
            </nav>
            <form 
                className="bg-white mt-10 rounded-lg shadow-lg p-10 max-w-3xl mx-auto"
                onSubmit={handleSubmit(handleForm)}
                noValidate    
            >
                <ProjectForm 
                    register={register}
                    errors={errors}
                />
                <input 
                    type="submit" 
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    value="Guardar proyecto"
                />
            </form>
        </>
    )
};
