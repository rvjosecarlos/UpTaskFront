import { useQuery } from "@tanstack/react-query";
import { UserDataSesion } from "@/types/index";
import { getUserData } from "@/api/authAPI";

export const useAuth = () => {
    const { data, error, isError, isLoading } = useQuery<UserDataSesion>({
        queryFn: getUserData,
        queryKey: ['getUserData'],
        retry: false,
        refetchOnWindowFocus: false,
    });
    return { data, error, isError, isLoading }
};