import axios, { AxiosInstance } from 'axios';
import { CoffeeConfig } from './types';
import { AuthUtils } from './utils/auth';
import { SubscriptionsPlans } from './resources/subscriptions-plans';
import { Currencies } from './resources/currencies';

export class CoffeeSDK {
    private axiosInstance: AxiosInstance;
    private config: CoffeeConfig;
    public subscriptionsPlans: SubscriptionsPlans;
    public currencies: Currencies;

    constructor(config: CoffeeConfig) {
        this.config = config;
        this.axiosInstance = axios.create({
            baseURL: config.baseUrl || 'https://production.coffee-pay.co/api/v1',
            timeout: config.timeout || 30000,
        });

        // Add interceptor to include JWT token in every request
        this.axiosInstance.interceptors.request.use((config) => {
            const token = AuthUtils.generateJWT(this.config.apiKey, this.config.apiSecret);
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        this.subscriptionsPlans = new SubscriptionsPlans(this.axiosInstance);
        this.currencies = new Currencies(this.axiosInstance);
    }
}
