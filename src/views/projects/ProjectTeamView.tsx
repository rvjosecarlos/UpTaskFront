import { deleteMember, getMembers } from "@/api/teamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { TeamMember } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

export default function ProjectTeamView(){
    const navigate = useNavigate();
    const parametros = useParams();
    const projectId = parametros.projectId!;

    const { data, error, isLoading } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getMembers(projectId)
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteMember,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
        }
    });

    const handleClick = ( userId: TeamMember['_id'] ) => {
        const dataRequest = {
            projectId,
            userId
        };
        mutate(dataRequest);
    };

    if( isLoading ) return "Cargando...";
    if( error ) return <Navigate to={'/404'}/>
    if (data) return (
        <>
            <h1 className="text-5xl font-black">
                Administrar Equipo
                </h1>
            <h2 className="text-2xl font-light text-gray-500 mt-5 pb-5">
                Adminstra el equipo de trabajo para este proyecto
            </h2>
            <nav className="my-5 flex gap-3">
                <button 
                    className="bg-purple-500 hover:bg-purple-700 py-3 px-5 text-white font-bold text-xl transition-colors"
                    onClick={() => navigate('?addMember=true')}
                >
                    Agregar Colaborador
                </button>
                <Link
                    to={`/projects/${projectId}`}
                    className=" bg-fuchsia-700 hover:bg-fuchsia-900 cursor-pointer py-3 px-5 text-white font-bold text-xl"
                >
                    Volver al proyecto
                </Link>
            </nav>

            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li 
                            className="flex justify-between gap-x-6 px-5 py-10"
                            key={member._id}
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        { member.name } 
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        { member.email }
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={()=>handleClick(member._id)}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}

            <AddMemberModal />
        </>
    );
};