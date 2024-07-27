
export default function ErrorMessage({ children }: { children: React.ReactNode }){
    return (
        <p className="bg-red-300 p-2 text-center text-red-500 font-bold">{children}</p>
    )
};