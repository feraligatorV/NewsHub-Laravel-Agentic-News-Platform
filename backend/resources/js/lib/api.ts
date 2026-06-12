import axios from 'axios';
import { clearSession, getToken } from './auth';
import type {
    AuthResponse,
    Category,
    News,
    PaginatedResponse,
    ResourceResponse,
} from '@/types/news';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
}

export async function logout(): Promise<void> {
    const token = getToken();

    if (token) {
        await api.post('/auth/logout');
    }

    clearSession();
}

export async function fetchNews(params?: {
    category?: string;
    search?: string;
}): Promise<PaginatedResponse<News>> {
    const response = await api.get<PaginatedResponse<News>>('/news', { params });
    return response.data;
}

export async function fetchNewsDetail(slug: string): Promise<ResourceResponse<News>> {
    const response = await api.get<ResourceResponse<News>>(`/news/${slug}`);
    return response.data;
}

export async function fetchRecommendedNews(slug: string): Promise<PaginatedResponse<News>> {
    const response = await api.get<PaginatedResponse<News>>(`/news/${slug}/recommended`);
    return response.data;
}

export async function fetchCategories(): Promise<PaginatedResponse<Category>> {
    const response = await api.get<PaginatedResponse<Category>>('/categories');
    return response.data;
}

export async function fetchCategoryNews(slug: string): Promise<PaginatedResponse<News>> {
    const response = await api.get<PaginatedResponse<News>>(`/categories/${slug}/news`);
    return response.data;
}

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === 'string') {
            return message;
        }
    }

    return 'Unable to complete the request.';
}
