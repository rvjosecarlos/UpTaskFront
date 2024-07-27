import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import { ToastContainer } from "react-toastify";

export default function AuthLayout(){
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[450px]">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>                
            </div>
            <ToastContainer                 
                autoClose={4000}
                closeOnClick={true}
                pauseOnHover={false}
            />
        </>
    );
};