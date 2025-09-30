import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService, Customer } from '../services/customerService';
import '../css/CustomersPage.css';

const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const customersData = await customerService.getAllCustomers();
        setCustomers(customersData);
        setFilteredCustomers(customersData);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => {
        const search = searchTerm.toLowerCase();
        const customerId = customer.customer_id.toString();
        const firstName = customer.first_name.toLowerCase();
        const lastName = customer.last_name.toLowerCase();
        const email = customer.email.toLowerCase();
        
        return customerId.includes(search) || 
               firstName.includes(search) || 
               lastName.includes(search) ||
               email.includes(search);
      });
      setFilteredCustomers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, customers]);

  const totalItems = filteredCustomers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const onPageSizeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const nextSize = parseInt(e.target.value, 10);
    setPageSize(nextSize);
    setCurrentPage(1);
  };

  const handleCustomerClick = (customerId: number) => {
    navigate(`/customer/${customerId}`);
  };

  if (loading) {
    return <div className="customers-loading">Loading customers...</div>;
  }

  if (error) {
    return (
      <div className="customers-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1 className="customers-title">Customers</h1>
      </div>

      {/* Search Section */}
      <div className="customers-search-section">
        <h2 className="customers-search-title">Search Customers</h2>
        <div className="customers-search-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, or email..."
            className="customers-search-input"
          />
        </div>
        <p className="customers-search-hint">Searching as you type…</p>
        {error && <div className="customers-error">{error}</div>}
      </div>

      {/* Customers List */}
      <div className="customers-results-section">
        <h2 className="customers-results-title">
          Customers ({filteredCustomers.length} found)
        </h2>
        <div className="customers-pagination">
          <div className="pagination-left">
            <label className="page-size-label">Per page</label>
            <select className="page-size-select" value={pageSize} onChange={onPageSizeChange}>
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
          <div className="pagination-right">
            <span className="pagination-info">Page {currentPage} of {totalPages}</span>
            <div className="pagination-buttons">
              <button className="pagination-btn" onClick={goPrev} disabled={currentPage === 1}>Prev</button>
              <button className="pagination-btn" onClick={goNext} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>

        <div className="customers-results-grid">
          {paginatedCustomers.map((customer) => (
            <div 
              key={customer.customer_id}
              onClick={() => handleCustomerClick(customer.customer_id)}
              className="customers-result-card"
            >
              <div className="customer-card-header">
                <h3 className="customer-name">
                  {customer.first_name} {customer.last_name}
                </h3>
                <span className={`customer-status ${customer.active ? 'active' : 'inactive'}`}>
                  {customer.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="customer-card-content">
                <p className="customer-email">{customer.email}</p>
                <div className="customer-meta">
                  <span>ID: {customer.customer_id}</span>
                  <span>Member since: {new Date(customer.create_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredCustomers.length === 0 && !loading && searchTerm && (
        <div className="customers-no-results">
          <h3>No customers found</h3>
          <p>Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
