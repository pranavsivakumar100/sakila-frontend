import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Staff Dashboard</h1>
        <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h2>Welcome, {user?.first_name} {user?.last_name}!</h2>
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Staff ID:</strong> {user?.staff_id}</p>
        <p><strong>Status:</strong> {user?.active ? 'Active' : 'Inactive'}</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Available Actions:</h3>
        <ul>
          <li>View Films</li>
          <li>Search Films</li>
          <li>Manage Rentals</li>
          <li>View Customers</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;