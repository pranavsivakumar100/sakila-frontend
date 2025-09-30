import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const navItems = [
    { path: '/', label: 'Home'},
    { path: '/films', label: 'Films'},
    { path: '/customers', label: 'Customers'},
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="navigation-sidebar">
      <div className="navigation-header">
        <h2 className="navigation-title">Sakila</h2>
      </div>

      <nav className="navigation-menu">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`navigation-item ${isActive(item.path) ? 'active' : ''}`}
          >
            
            <span className="navigation-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="navigation-footer">
        <div className="navigation-profile">
          <button
            className="profile-button"
            onClick={() => setOpenProfileMenu((v) => !v)}
          >
            <div className="profile-avatar">
              {(user?.first_name?.[0] || 'U')}{(user?.last_name?.[0] || '')}
            </div>
            <div className="profile-info">
              <div className="profile-name">{user?.first_name} {user?.last_name}</div>
              <div className="profile-role">Staff</div>
            </div>
            <span className="profile-caret">▾</span>
          </button>
          {openProfileMenu && (
            <div className="profile-menu">
              <button className="profile-menu-item" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
