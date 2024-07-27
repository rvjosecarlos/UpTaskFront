import { deleteTask } from "@/api/taskAPI";
import { Task } from "@/types/index";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, ArrowsPointingOutIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
    task: Task,
    canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps){
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectView', projectId] });
            toast.success(data);
        }
    });

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
        data: {
            status: task.taskStatus
        }
    });

    const animaSuave = () => {
        const styles = transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            "border": "solid 1px #7e22ce",
            "padding": "2rem",
            "zIndex": "100",
            "cursor": "grabbing",
            "backgroundColor": "#a21caf",
            "transition": "background-color 0.3s ease-out"
        } : {
            "cursor": "grab",
            "padding": "1rem"
        };
        return styles;
    };

    window.requestAnimationFrame(animaSuave);

    return (
        <li 
            className={ transform ? "flex flex-col gap-3" : " shadow-lg flex flex-col gap-3 border-slate-200 border bg-white p-5" }
        >
                <div className={ transform ? 'hidden': 'flex justify-between'}>
                    <div className="min-w-0 flex flex-col gap-y-4">
                        <button 
                            className="text-xl font-bold text-slate-600 text-left"
                            onClick={()=>navigate(location.pathname + `?viewTask=${task._id}`)}
                        >
                            { task.name }
                        </button>               
                    </div>
                    <div className="flex shrink-0  gap-x-6">
                        <Menu as="div" className="relative flex-none">
                            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">opciones</span>
                                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                            </MenuButton>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-50"
                                enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-50">
                                <MenuItems
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <MenuItem>
                                        <button 
                                            type='button' 
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={()=>navigate(location.pathname + `?viewTask=${task._id}`)}
                                        >
                                            Ver Tarea
                                        </button>
                                    </MenuItem>
                                    {
                                        canEdit &&
                                        <>
                                            <MenuItem>
                                                <button 
                                                    type='button' 
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    onClick={()=>navigate(`${location.pathname}?editTask=${task._id}`)}
                                                >
                                                    Editar Tarea
                                                </button>
                                            </MenuItem>

                                            <MenuItem>
                                                <button 
                                                    type='button' 
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={()=>mutate({ projectId, taskId: task._id })}
                                                >
                                                    Eliminar Tarea
                                                </button>
                                            </MenuItem>
                                        </>
                                    }
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            <div
                style={animaSuave()}
                className={ `flex flex-col items-center gap-5 ${transform && ' shadow-2xl shadow-purple-700'}`}
                ref={setNodeRef}
                { ...attributes }
                { ...listeners }
            >
                { transform ? 
                    <>   
                        <p className="text-xl font-bold text-white text-left">{task.name}</p> 
                        <p className="text-white text-left w-full">{task.description}</p>                        
                        <ArrowsPointingOutIcon className="size-6 rotate-45 text-white"/>                                            
                    </> 
                    :
                    <>
                        <p className="text-slate-500">{ task.description }</p> 
                        <ArrowsPointingOutIcon className="size-6 text-fuchsia-800 rotate-45"/> 
                    </> 
                }                    
            </div>
        </li>
    )
}