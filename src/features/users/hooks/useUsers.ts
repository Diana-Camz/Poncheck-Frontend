import { useQuery } from "@tanstack/react-query"
import { getCurrentUser, getUserById } from "../api/users.api"

export const useUser = (id: number) => {
    const userByIdQuery = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
    });

    const currentUserQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => getCurrentUser,
    });
    return{
        userByIdQuery,
        currentUserQuery
    }
}