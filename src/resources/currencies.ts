import { AxiosInstance } from 'axios';
import { ApiResponse, Currency, ListResponse } from '../types';

export class Currencies {
    constructor(private axios: AxiosInstance) { }

    /**
     * Retrieves a list of currencies.
     * @param limit Number of items to retrieve (default: 100)
     * @param page Page number (default: 1)
     */
    async list(limit: number = 100, page: number = 1): Promise<ListResponse<Currency>> {
        const response = await this.axios.get<ListResponse<Currency>>('/admin/currencies', {
            params: { limit, page },
        });
        return response.data;
    }

    /**
     * Retrieves a currency by ID.
     */
    async get(id: string): Promise<ApiResponse<Currency>> {
        const response = await this.axios.get<ApiResponse<Currency>>(`/admin/currencies/${id}`);
        return response.data;
    }
}
