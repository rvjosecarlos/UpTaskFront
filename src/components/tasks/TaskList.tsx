import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, Task } from "@/types/index"
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locale/es";
import TaskDroppable from "./TaskDroppable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/taskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
    tasks: Task[],
    canEdit: boolean
}

type EstadosTareas = {
    [key: string] : Task[]
}

const estadosTareas: EstadosTareas = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}  

const statusStyles : { [key: string] : string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

export function TaskList({tasks, canEdit}: TaskListProps){    

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projectView', projectId] });
        }
    });

    const groupedTasks = tasks.reduce((acc, task: Task) => {
        let currentGroup = acc[task.taskStatus] ? [...acc[task.taskStatus]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.taskStatus]: currentGroup };
    }, estadosTareas);

    const handleDragEnd = ( dragEvent: DragEndEvent ) => {
        const { active, over } = dragEvent;
        if( over && over.id && !tasks.find( task => task.taskStatus === over.id && task._id === active.id ) ){
            const activeId = active.id as Task['_id'];
            const overId = over.id as Task['taskStatus'];
            const data = {
                projectId,
                taskId: activeId,
                taskStatus: overId
            }
            mutate(data);
            queryClient.setQueryData(['projectView', projectId], (oldData: Project)=> {
                const updateTask = oldData.tasks.map( task => {
                    if( task._id === activeId ){
                        task.taskStatus = overId;
                        return task;
                    }
                    return task;
                });
                return {
                    ...oldData,
                    tasks: updateTask
                }
            });
        };
    };

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>               

                <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                    <DndContext onDragEnd={(dragEvent) => handleDragEnd(dragEvent)  }>
                        {Object.entries(groupedTasks).map(([status, tasks]) => (
                            <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                                <h3 
                                    className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
                                >
                                    {statusTranslations[status]}
                                </h3>
                                <TaskDroppable status={status as Task['taskStatus']}/>
                                <ul className='mt-5 space-y-5'>
                                    {tasks.length === 0 ? (
                                        <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                    ) : (
                                        tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                    )}
                                </ul>
                            </div>
                        ))}
                    </DndContext>
                </div>
        </>
    )
};