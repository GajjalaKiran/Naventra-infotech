import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const decoded = jwtDecode(token);
  if (decoded.role !== role) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;