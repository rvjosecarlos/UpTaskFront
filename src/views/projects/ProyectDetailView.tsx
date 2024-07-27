import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projectsAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { TaskList } from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { isManager } from "@/utils/policies";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { Task } from "@/types/index";

export default function EditProjectView(){
    const { data: userData, isLoading: isLoadingUser } = useAuth();

    const navigate = useNavigate();
    const parametros = useParams();
    const projectId = parametros.projectId!;
    
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectView', projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1
    });

    const canEdit = useMemo( ()=> data?.manager === userData?._id, [userData, data] );

    if( isLoading || isLoadingUser ) return 'Cargando...';
    if( isError ) return <Navigate to={'/404'}/>;
    if( data && userData ) return (
        <>
            <h1 className="text-5xl font-black">
                {data.projectName}
                </h1>
            <h2 className="text-2xl font-light text-gray-500 mt-5 pb-5">
                {data.description}
            </h2>
            <nav className="my-5 flex gap-3">
            {
                isManager(userData._id, data.manager ) &&
                <>
                    <button 
                        className="bg-purple-500 hover:bg-purple-700 py-3 px-5 text-white font-bold text-xl transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >
                        Agregar Tarea
                    </button>
                    <Link
                        to={ location.pathname + "/team" }
                        className=" bg-fuchsia-700 hover:bg-fuchsia-900 cursor-pointer py-3 px-5 text-white font-bold text-xl"
                    >
                        Colaboradores
                    </Link>
                </>
            }
            </nav>
            <TaskList tasks={data.tasks as Task[]} canEdit={canEdit}/>
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    );

};