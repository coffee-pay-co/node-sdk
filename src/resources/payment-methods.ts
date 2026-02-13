import { AxiosInstance } from 'axios';
import { ApiResponse, PaymentMethod, ListResponse } from '../types';

export class PaymentMethods {
    constructor(private axios: AxiosInstance) { }

    /**
     * Retrieves a list of available payment methods.
     * @param limit Number of items to retrieve (default: 100)
     * @param page Page number (default: 1)
     */
    async list(limit: number = 100, page: number = 1): Promise<ListResponse<PaymentMethod>> {
        const response = await this.axios.get<ListResponse<PaymentMethod>>('/payments-methods', {
            params: { limit, page },
        });
        return response.data;
    }

    /**
     * Retrieves a payment method by ID.
     */
    async get(id: string): Promise<ApiResponse<PaymentMethod>> {
        const response = await this.axios.get<ApiResponse<PaymentMethod>>(`/payments-methods/${id}`);
        return response.data;
    }
}
