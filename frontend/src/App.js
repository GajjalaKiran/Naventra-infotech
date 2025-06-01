import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/user" element={<PrivateRoute role="user" />}>
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;