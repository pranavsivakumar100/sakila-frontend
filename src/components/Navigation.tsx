import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/films', label: 'Browse Films', icon: '🎬' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="navigation-sidebar">
      <div className="navigation-header">
        <h2 className="navigation-title">Sakila</h2>
        <div className="navigation-user">
          <span className="user-name">{user?.first_name} {user?.last_name}</span>
          <span className="user-role">Staff</span>
        </div>
      </div>

      <nav className="navigation-menu">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`navigation-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="navigation-icon">{item.icon}</span>
            <span className="navigation-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="navigation-footer">
        <button onClick={logout} className="navigation-logout">
          <span className="navigation-icon">🚪</span>
          <span className="navigation-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
