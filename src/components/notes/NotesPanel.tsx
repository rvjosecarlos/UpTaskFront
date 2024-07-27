import { Note } from "@/types/index";
import { NoteDetail } from "./NoteDetail";
import { NoteForm } from "./NoteForm";

type NotesPanelProps = {
    notes: Note[]
}

export function NotesPanel({ notes }: NotesPanelProps){
    return (
        <>
            <NoteForm />
            {
                notes.length !== 0 &&
                <div className="mt-10 space-y-2">
                    <p className="text-2xl font-bold mb-5">Notas:</p>
                    {
                        notes.map( nota => <NoteDetail key={nota._id} nota={nota}/> )
                    }
                </div>
            }
        </>
    );
};