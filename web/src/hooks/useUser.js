import { useMemo } from 'react'
import { getUser } from '../services/userServices'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
    const { data: users = [], isLoading: loading, error, isError } = useQuery({
        queryKey: ['users'],
        queryFn: getUser,
    })

    const filteredUsers = useMemo(() => {
        const userJson = sessionStorage.getItem('user')
        const userId = userJson ? JSON.parse(userJson).userId : null
        return users.filter(user => user.userId !== userId)
    }, [users])

    return {
        users: filteredUsers,
        loading,
        isError,
        errorMessage: error?.message || null
    }
}
