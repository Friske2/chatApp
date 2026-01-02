import { useMutation } from "@tanstack/react-query"
import { login } from "../services/authService"
import { getUserByUserId } from "../services/userServices"
import { setToken, setRefreshToken } from "../utils/token"
import { useNavigate } from "react-router-dom"

export default function useAuth() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (payload) => login(payload),
        onSuccess: async (data) => {
            setToken(data.token)
            setRefreshToken(data.refreshToken)
            try {
                const { userId } = await getUserByUserId()
                if (userId) {
                    sessionStorage.setItem('userId', userId)
                }
                navigate('/')
            } catch (error) {
                console.error("Failed to fetch user details", error)
            }
        },
    })
}