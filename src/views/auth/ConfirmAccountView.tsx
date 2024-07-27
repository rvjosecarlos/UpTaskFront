import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/authAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);    
            navigate('/auth/login');
        }
    });

    const handleComplete = ( valueToken: ConfirmToken['token'] ) => mutate(valueToken);

    return (
        <>
        <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
        <p className="text-2xl font-light text-white mt-5">
            Ingresa el código que recibiste {''}
            <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
        </p>
        <form
            className="space-y-8 p-10 bg-white mt-10"
        >
            <label
            className="font-normal text-2xl text-center block"
            >Código de 6 dígitos</label>
            <div className="flex justify-center gap-5">
                <PinInput placeholder="__" onComplete={handleComplete}>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                    <PinInputField className="h-15 w-10 border rounded p-3 text-center font-bold text-2xl"/>
                </PinInput>
            </div>
        </form>

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                to='/auth/new-code'
                className="text-center text-gray-300 font-normal"
            >
            Solicitar un nuevo Código
            </Link>
        </nav>

        </>
    )
}