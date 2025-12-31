import { useQuery } from "@tanstack/react-query"
import { userLogin } from "../services/userServices"

export default function useAuth(payload) {
    const { data: user, isLoading: loading, isError: isError, error: error } = useQuery({
        queryKey: ['user', payload],
        queryFn: () => userLogin(payload),
    })
    return { user, loading, isError, error }
}