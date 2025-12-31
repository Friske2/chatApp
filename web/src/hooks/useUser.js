import { useEffect, useState } from 'react'
import { getUser } from '../services/userServices'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
    const [filteredUsers, setFilteredUsers] = useState([])
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const { data: users = [], isLoading: loading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUser,
    })
    useEffect(() => {
        const userJson = sessionStorage.getItem('user')
        const userId = userJson ? JSON.parse(userJson).userId : null
        const filteredUsers = users.filter(user => user.userId !== userId)
        setFilteredUsers(filteredUsers)
    }, [users])

    useEffect(() => {
        if (error) {
            setIsError(true)
            setErrorMessage(error.message)
        }
    }, [error])

    useEffect(() => {
        if (!loading) {
            setIsError(false)
            setErrorMessage(null)
        }
    }, [loading])

    return { users: filteredUsers, loading, isError, errorMessage }
}
