import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "types";
import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "@/api/projectsAPI";
import { toast } from "react-toastify";

const initialValue: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
};

export default function CreateProjectView(){

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValue });
    const { mutateAsync } = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data);
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleForm = async ( formData: ProjectFormData ) => await mutateAsync(formData);

    return (
        <>
            <h1 className="text-5xl font-black">Crear proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5 pb-5">Llena el siguiente formulario para crear un proyecto</p>
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
                    value="Crear proyecto"
                />
            </form>
        </>
    )
};