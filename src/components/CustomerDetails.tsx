import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerService, CustomerDetails } from '../services/customerService';
import '../css/CustomerDetails.css';

const CustomerDetailsPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!customerId) return;
      
      try {
        setLoading(true);
        const customerData = await customerService.getCustomerDetails(parseInt(customerId));
        setCustomer(customerData);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) {
    return <div className="customer-details-loading">Loading customer details...</div>;
  }

  if (error) {
    return (
      <div className="customer-details-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="customer-details-error">
        <h2>Customer Not Found</h2>
        <p>The requested customer could not be found.</p>
      </div>
    );
  }

  return (
    <div className="customer-details-container">
      <div className="customer-details-header">
        <h1 className="customer-details-title">
          {customer.first_name} {customer.last_name}
        </h1>
      </div>

      <div className="customer-details-content">
        <div className="customer-details-main">
          <div className="customer-details-info">
            <h2>Customer Information</h2>
            <div className="customer-info-grid">
              <div className="customer-info-item">
                <label>Customer ID:</label>
                <span>{customer.customer_id}</span>
              </div>
              <div className="customer-info-item">
                <label>First Name:</label>
                <span>{customer.first_name}</span>
              </div>
              <div className="customer-info-item">
                <label>Last Name:</label>
                <span>{customer.last_name}</span>
              </div>
              <div className="customer-info-item">
                <label>Email:</label>
                <span>{customer.email}</span>
              </div>
              <div className="customer-info-item">
                <label>Status:</label>
                <span className={`customer-status ${customer.active ? 'active' : 'inactive'}`}>
                  {customer.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="customer-info-item">
                <label>Member Since:</label>
                <span>{new Date(customer.create_date).toLocaleDateString()}</span>
              </div>
              <div className="customer-info-item">
                <label>Last Update:</label>
                <span>{new Date(customer.last_update).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {customer.address && (
            <div className="customer-details-address">
              <h2>Address Information</h2>
              <div className="address-info">
                <div className="address-line">
                  <strong>{customer.address.address}</strong>
                </div>
                {customer.address.address2 && (
                  <div className="address-line">{customer.address.address2}</div>
                )}
                <div className="address-line">
                  {customer.address.district}
                  {customer.city && `, ${customer.city.city}`}
                  {customer.country && `, ${customer.country.country}`}
                </div>
                {customer.address.postal_code && (
                  <div className="address-line">Postal Code: {customer.address.postal_code}</div>
                )}
                {customer.address.phone && (
                  <div className="address-line">Phone: {customer.address.phone}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="customer-details-sidebar">
          <div className="customer-details-summary">
            <h3>Customer Summary</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">{customer.customer_id}</span>
                <span className="stat-label">Customer ID</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{customer.active ? 'Active' : 'Inactive'}</span>
                <span className="stat-label">Status</span>
              </div>
            </div>
          </div>

          <div className="customer-details-actions">
            <h3>Quick Actions</h3>
            <button 
              onClick={() => navigate('/customers')}
              className="action-btn primary"
            >
              Back to Customers
            </button>
            <button 
              onClick={() => navigate('/')}
              className="action-btn secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
