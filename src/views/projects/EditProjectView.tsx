import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { getProjectById } from "@/api/projectsAPI";

export default function EditProjectView(){
    const parametros = useParams();
    const projectId = parametros.projectId!;
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1
    });

    if( isLoading ) return 'Cargando...';
    if( isError ) return <Navigate to={'/404'}/>;
    if( data ) return <EditProjectForm data={data} projectId={projectId}/>;

};