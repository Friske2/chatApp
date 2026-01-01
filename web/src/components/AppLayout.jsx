import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
    const userJson = sessionStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user) {
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