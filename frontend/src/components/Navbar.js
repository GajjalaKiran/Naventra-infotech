import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav>
      <h3>Notification System</h3>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
