import { AxiosInstance } from 'axios';
import { ApiResponse, CreateSubscriptionPlanDto, ListResponse, SubscriptionPlan, UpdateSubscriptionPlanDto } from '../types';

export class SubscriptionsPlans {
    constructor(private axios: AxiosInstance) { }

    /**
     * Retrieves a list of subscription plans.
     * @param limit Number of items to retrieve (default: 100)
     * @param page Page number (default: 1)
     */
    async list(limit: number = 100, page: number = 1): Promise<ListResponse<SubscriptionPlan>> {
        const response = await this.axios.get<ListResponse<SubscriptionPlan>>('/subscriptions-plans', {
            params: { limit, page },
        });
        return response.data;
    }

    /**
     * Creates a new subscription plan.
     */
    async create(data: CreateSubscriptionPlanDto): Promise<ApiResponse<SubscriptionPlan>> {
        const response = await this.axios.post<ApiResponse<SubscriptionPlan>>('/subscriptions-plans', data);
        return response.data;
    }

    /**
     * Retrieves a subscription plan by ID.
     */
    async get(id: string): Promise<ApiResponse<SubscriptionPlan>> {
        const response = await this.axios.get<ApiResponse<SubscriptionPlan>>(`/subscriptions-plans/${id}`);
        return response.data;
    }

    /**
     * Updates an existing subscription plan.
     */
    async update(id: string, data: UpdateSubscriptionPlanDto): Promise<ApiResponse<SubscriptionPlan>> {
        const response = await this.axios.patch<ApiResponse<SubscriptionPlan>>(`/subscriptions-plans/${id}`, data);
        return response.data;
    }

    /**
     * Deletes a subscription plan by ID.
     */
    async delete(id: string): Promise<ApiResponse<any>> {
        const response = await this.axios.delete<ApiResponse<any>>(`/subscriptions-plans/${id}`);
        return response.data;
    }
}
