import { useQuery } from "@tanstack/react-query"
import { login } from "../services/authService"
import { setToken, setRefreshToken } from "../utils/token"

export default function useAuth(payload) {
    const { data: user, isLoading: loading, isError: isError, error: error } = useQuery({
        queryKey: ['user', payload],
        queryFn: () => login(payload),
    })
    if (user) {
        setToken(user.token)
        setRefreshToken(user.refreshToken)
    }
    return { user, loading, isError, error }
}