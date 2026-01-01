import UserCard from '../components/UserCard'
import Hero from '../components/Hero'
import { useUsers } from '../hooks/useUser'

function Home() {
    const { users, loading, isError, errorMessage } = useUsers()

    const renderContent = () => {
        if (loading) {
            return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>
        }
        if (isError) {
            return (
                <div className="text-center mt-20">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <Hero />
            {renderContent()}
        </div>
    )
}

export default Home