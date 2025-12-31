function UserAvatar({ src, status = 'online', size = 'w-10' }) {
    return (
        <div className={`avatar ${status ? status : ''}`}>
            <div className={`${size} rounded-full`}>
                <img src={src || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="User Avatar" />
            </div>
        </div>
    )
}

export default UserAvatar
