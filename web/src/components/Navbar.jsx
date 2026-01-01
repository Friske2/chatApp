import { Link } from "react-router-dom";
import { userLogout } from "../services/userServices";
import { getUserId } from "../utils/chatUtils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    const handleLogout = useCallback(async () => {
        try {
            const userId = getUserId();
            await userLogout(userId);
            sessionStorage.clear();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }, [navigate]);
    return (
        <header className="app-header fade-in border-b border-base-300 pb-4">
            <div className="navbar bg-base-100 rounded-box shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl text-primary">ChatApp</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar