export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface News {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content?: string;
    image_url: string | null;
    source: string;
    published_at: string | null;
    category: Category;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    links?: Record<string, unknown>;
    meta?: Record<string, unknown>;
}

export interface ResourceResponse<T> {
    data: T;
}

export interface AuthResponse {
    data: {
        user: User;
        token_type: 'bearer';
        access_token: string;
        expires_in: number;
    };
}
