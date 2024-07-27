import { getTaksById } from "@/api/taskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EdtiTaskModal";

export default function EditTaskData() {

    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const taskId = urlParams.get('editTask')!;

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaksById({ projectId, taskId }),
        retry: false,
        enabled: !!taskId // Esta sintaxis convierte un valor truthy en booleano
    });

    if( isError ) return <Navigate to={'/404'}/>
    if( data ) return <EditTaskModal data={data} taskId={taskId} />
};