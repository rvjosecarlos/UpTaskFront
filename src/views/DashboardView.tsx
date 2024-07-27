import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projectsAPI";;
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import DeleteProjectModal from '@/components/projects/DeleteProjectModal';

export default function DashboardView(){

    const navigate = useNavigate();

    const { data: userData, isLoading: isLoadingUser } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    if(isLoading || isLoadingUser) return "Cargando...";
    if(data && userData) return (
        <>
            <h1 className="text-5xl font-black">Mis proyectos</h1>
            <p className="text-2xl font-light text-gray-500 mt-5 pb-5">Maneja y administra tus proyectos</p>
            <nav className="my-5">
                <Link 
                    className="bg-purple-500 hover:bg-purple-700 px-10 py-3 text-xl text-white uppercase font-bold cursor-pointer transition-colors"
                    to='/projects/create'
                >
                    Nuevo Proyecto
                </Link>
            </nav>
            {
                data && data.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                        {data.map((project) => (
                        <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <Link to={`/projects/${project._id}`}
                                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{project.projectName}</Link>
                                    <p className="text-sm text-gray-400">
                                        Cliente: {project.clientName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                    { isManager(userData._id, project.manager) ? 
                                        <p className="text-center w-20 font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg py-1">Manager</p> 
                                        : 
                                        <p className="text-center w-32 font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg py-1">Colaborador</p> 
                                    }
                                </div>
                            </div>                            
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                                <Menu.Item>
                                                    <Link to={`/projects/${project._id}`}
                                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    Ver Proyecto
                                                    </Link>
                                                </Menu.Item>
                                                { isManager(userData._id, project.manager) &&
                                                    <>
                                                        <Menu.Item>
                                                            <Link to={`/projects/${project._id}/edit`}
                                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                            Editar Proyecto
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <button 
                                                                type='button' 
                                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                                onClick={() => navigate(`${location.pathname}?deleteProject=${project._id}`)}
                                                            >
                                                                Eliminar Proyecto
                                                            </button>
                                                        </Menu.Item>
                                                    </>
                                                }
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p
                        className='py-20 text-center text-xl'
                    >
                        No hay proyectos aun.{' '}
                        <Link
                            className='text-fuchsia-700 font-bold'
                            to='/projects/create'
                        >
                            Crear Proyecto
                        </Link>
                    </p>
                )
            }
            <DeleteProjectModal />
        </>
    )
};