import { useQuery } from "@tanstack/react-query"
import { getCurrentUser, getUserById } from "../api/users.api"

export const useUser = (id: number) => {
    const userByIdQuery = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
    });
    return {
        userByIdQuery
    }
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 25 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}