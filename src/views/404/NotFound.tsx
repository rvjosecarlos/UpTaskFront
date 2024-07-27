import { Link } from "react-router-dom";

export default function(){
    return (
        <div className="m-auto space-y-10">
            <h2 className="text-white text-4xl text-center font-bold">Página no encontrada</h2>
            <p 
                className="text-white text-center"
            >
                Volver a {' '}
                <Link 
                    className="text-fuchsia-500"
                    to={'/'}
                >
                    Proyectos
                </Link>
            </p>
        </div>
    );
};