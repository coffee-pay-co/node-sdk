export interface CoffeeConfig {
    apiKey: string;
    apiSecret: string;
    baseUrl?: string;
    timeout?: number;
}

export interface AuthPayload {
    iss: string;
    jti: string;
    iat: number;
    exp: number;
}

export interface SubscriptionPlan {
    id: string;
    accountId: string;
    name: string;
    reference: string;
    description: string;
    price: number;
    currencyId: string;
    interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
    intervalCount: number;
    billingDay: number;
    freeDays: number;
    allowProrate: boolean;
    redirectUrl: string;
    urlBack: string;
    source: string;
    status: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    error: boolean;
    data: T;
    message: string;
}

export interface ListResponse<T> {
    error: boolean;
    data: T[];
    message: string;
    options: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface CreateSubscriptionPlanDto {
    name: string;
    description: string;
    price: number;
    currencyId: string;
    interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
    accountId: string;
    billingDay: number;
    freeDays: number;
    status: boolean;
    source: string;
    intervalCount?: number;
    reference?: string;
    allowProrate?: boolean;
    redirectUrl?: string;
    urlBack?: string;
}

export type UpdateSubscriptionPlanDto = Partial<CreateSubscriptionPlanDto>;

export interface Currency {
    id: string;
    isoCode: string;
    tim: number;
    symbol: string;
    decimalSeparator: string;
    thousandSeparator: string;
    visaCode: string;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}
