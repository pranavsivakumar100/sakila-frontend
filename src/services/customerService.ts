import api from './api';

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address_id: number;
  active: boolean;
  create_date: string;
  last_update: string;
  full_name?: string;
}

export interface CustomerDetails extends Customer {
  address?: {
    address_id: number;
    address: string;
    address2?: string;
    district: string;
    city_id: number;
    postal_code?: string;
    phone?: string;
    last_update: string;
  };
  city?: {
    city_id: number;
    city: string;
    country_id: number;
    last_update: string;
  };
  country?: {
    country_id: number;
    country: string;
    last_update: string;
  };
}

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    const response = await api.get('/customers/');
    return response.data as Customer[];
  },

  async getCustomerDetails(customerId: number): Promise<CustomerDetails> {
    const response = await api.get(`/customers/${customerId}`);
    return response.data as CustomerDetails;
  },
};
