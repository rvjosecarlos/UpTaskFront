import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaksById, updateTaskStatus } from '@/api/taskAPI';
import { dateFormat } from '@/utils/utils';
import { statusTranslations } from '@/locale/es';
import { toast } from 'react-toastify';
import { Task } from '@/types/index';
import { NotesPanel } from '../notes/NotesPanel';


export default function TaskModalDetails() {

    const params = useParams();
    const projectId = params.projectId!;
    
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const taskId = urlParams.get('viewTask')!;
    const show = !!taskId;

    const navigate = useNavigate();

    const { data, isError, error } = useQuery({
        queryFn: () => getTaksById({ projectId, taskId }),
        queryKey: ['viewTask', taskId],
        enabled: show,
        retry: false
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] });
            queryClient.invalidateQueries({ queryKey: ['projectView', projectId] });
            toast.success(data);
        }
    });

    const handleChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
        const taskStatus = e.target.value as Task['taskStatus'];
        const dataStatus = {
            projectId,
            taskId,
            taskStatus
        };
        mutate(dataStatus);
    };

    if( isError ){
        setTimeout(()=>{
            toast.error( !error.message.includes('object') ? error.message : 'Tarea no encontrada id', { toastId: taskId });
        }, 500);
        return <Navigate to={location.pathname} />
    } 
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {dateFormat(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {dateFormat(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >
                                        {data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    {
                                        data.updateStatusHistorial.length !== 0 &&
                                        <>
                                            <p className='text-2xl text-slate-500 mb-2 font-black'>Historial de Cambios</p>
                                            <ol>
                                                {
                                                    data.updateStatusHistorial.map( (statusLog, indice) => 
                                                        <li key={statusLog._id}>
                                                            <span className=' font-bold'>{indice === data.updateStatusHistorial.length - 1 ? `Ultima actualización: ${statusTranslations[statusLog.taskStatus]}` : statusTranslations[statusLog.taskStatus]}</span>{' '} por
                                                            {` ${statusLog.user.name}`}
                                                        </li>
                                                    ).reverse()
                                                }
                                            </ol>
                                        </>
                                    }
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select 
                                            value={data.taskStatus}
                                            className='w-full p-2 bg-slate-100 border'
                                            onChange={(e)=>handleChange(e)}
                                        >
                                            { 
                                                Object.entries(statusTranslations).map(([key, valueDisplay]) => 
                                                    <option key={key} value={key}>{valueDisplay}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    
                                    <NotesPanel notes={data.notes}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}