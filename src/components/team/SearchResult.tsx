import { addMember } from "@/api/teamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    teamMember: TeamMember,
    reset: () => void 
}

export function SearchResult( { teamMember, reset }: SearchResultProps ){

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addMember,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate(location.pathname, { replace: true });
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId]});
        }
    });

    const handleClick = () => {
        const dataRequest = {
            projectId,
            userId: teamMember._id
        };
        mutate(dataRequest);
    };

    return (
        <>
            <p className="font-bold text-center">Resultado:</p>
            <div className="flex justify-between">
                <p className="text-2xl font-semibold">{teamMember.name}</p>
                <button
                    className="font-bold text-purple-800 hover:bg-purple-400 hover:text-white py-3 px-2"
                    onClick={handleClick}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    );
};