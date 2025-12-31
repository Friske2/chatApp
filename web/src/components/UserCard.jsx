import { Link } from 'react-router-dom'
import UserAvatar from './UserAvatar'

function UserCard({ user }) {
    return (
        <Link
            to={`/chat/${user.userId}`}
            className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="card-body flex-row items-center gap-4 p-4">
                <UserAvatar status={user.status} />
                <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <span className={`text-xs ${user.status === 'online' ? 'text-success' : 'text-base-content/50'}`}>
                        {user.status}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default UserCard
