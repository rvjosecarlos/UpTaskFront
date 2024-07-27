import { Task } from "@/types/index";
import { useDroppable } from "@dnd-kit/core";

type TaskDroppableProps = {
    status: Task['taskStatus']
}

export default function TaskDroppable({status}: TaskDroppableProps){

    const { isOver, setNodeRef, active } = useDroppable({
        id: status
    });

    const mismoEstado = active ? active.data.current : null;

    const style = isOver && mismoEstado?.status !== status ? {
        "padding": "5rem",
        "borderColor": "#4ade80",
        "borderRadius": "10px",
        "color": "#4ade80",
        "fontWeight": "700",
        "fontSize": "1.5rem",
        "transition": "padding 0.3s ease-in-out, border-color 0.7s ease, color 0.7s ease, font-size 0.3s ease"
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="border-8 border-dashed text-center mt-5 p-2 text-gray-300 transform"
        >
            Soltar aquí
        </div>
    );
};