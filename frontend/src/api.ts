const BASE_URL = 'http://localhost:3000';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export class errorData {
    status: HttpStatus;

    constructor(status: HttpStatus) {
        this.status = status;
    }
}

export async function fetchData<T>(url?: string, options?: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);

        if (!response.ok) {
            // const responseError = await response.json();
            // 만약 실패 응답에 상태코드만 있다면 errorData 클래스 필요없음
            // const error = new errorData(response.status as HttpStatus);
            throw response.status;
        }

        if (response.status !== HttpStatus.NO_CONTENT) {
            return await response.json() as T;
        }

        return null;
    } catch (error) {
        // const errorData = error as errorData;
        // console.error(`Fetch error: ${errorData.status}`);
        // throw errorData;
        console.error(`Fetch error: ${error}`);
        throw error;
    }
}