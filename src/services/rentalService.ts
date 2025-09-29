import api from './api';

export interface Rental {
  rental_id: number;
  rental_date: string;
  return_date: string | null;
  customer_id: number;
  film_id: number;
  staff_id: number;
}

export interface CreateRentalRequest {
  customer_id: number;
  film_id: number;
}

export const rentalService = {
    async createRental(data: CreateRentalRequest): Promise<Rental> {
        const response = await api.post('/rentals', data);
        return response.data as Rental;
      },
    
    async returnRental(rentalId: number): Promise<{ message: string }> {
        const response = await api.put(`/rentals/${rentalId}/return`);
        return response.data as { message: string };
    },

    async getRentalDetails(rentalId: number): Promise<Rental> {
        const response = await api.get(`/rentals/${rentalId}`);
        return response.data as Rental;
    },

    async getCustomerActiveRentals(customerId: number): Promise<Rental[]> {
        const response = await api.get(`/rentals/customer/${customerId}`);
        return response.data as Rental[];
    }
};