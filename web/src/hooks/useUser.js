import { useMemo } from 'react'
import { getUser } from '../services/userServices'
import { useQuery } from '@tanstack/react-query'
import { getUserId } from '../utils/chatUtils'

export function useUsers() {
    const { data: users = [], isLoading: loading, error, isError } = useQuery({
        queryKey: ['users'],
        queryFn: getUser,
    })

    const filteredUsers = useMemo(() => {
        const userId = getUserId()
        return users.filter(user => user.userId !== userId)
    }, [users])

    return {
        users: filteredUsers,
        loading,
        isError,
        errorMessage: error?.message || null
    }
}
