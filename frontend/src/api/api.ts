const BASE_URL = 'http://localhost:3000';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

export async function fetchData<T>(url?: string, options?: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);

        if (!response.ok) {
            throw response.status as HttpStatus;
        }

        if (response.status !== HttpStatus.NO_CONTENT) {
            return await response.json() as T;
        }

        return null;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw (error);
    }
}