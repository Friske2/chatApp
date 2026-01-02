import { Navigate, Outlet } from 'react-router-dom';
import { getRefreshToken, getToken } from '../utils/token';
const ProtectedRoute = () => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    if (!token || !refreshToken) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
