import NewPasswordToken from "@/components/authentication/NewPasswordToken";
import NewPasswordForm from "@/components/authentication/NewPasswordForm";
import { useState } from "react"

export default function NewPasswordView(){
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState('');

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código{''}
                <span className=" text-fuchsia-500 font-bold"> de verificación</span>
            </p>
            { isValidToken ? 
                <NewPasswordForm token={token}/>
            : 
                <NewPasswordToken setIsValidToken={setIsValidToken} setToken={setToken}/> 
            }
        </>
    )
};