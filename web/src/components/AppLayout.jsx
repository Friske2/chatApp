import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRefreshToken } from "../utils/token";
import Navbar from "./Navbar";

function AppLayout() {
    const token = getToken();
    const refreshToken = getRefreshToken();
    if (!token || !refreshToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout