import type { User } from '@/types/news';

const TOKEN_KEY = 'newshub.jwt';
const USER_KEY = 'newshub.user';

export function getToken(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const value = window.localStorage.getItem(USER_KEY);

    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value) as User;
    } catch {
        window.localStorage.removeItem(USER_KEY);
        return null;
    }
}

export function storeSession(token: string, user: User): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('newshub-auth-changed'));
}

export function clearSession(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('newshub-auth-changed'));
}
