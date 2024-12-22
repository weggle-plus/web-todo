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

export class ErrorData {
    status: HttpStatus;
    message: string;

    constructor(status: HttpStatus, message: string){
        this.status = status;
        this.message = message;
    }
}

export async function fetchData<T>(url?: string, options?: RequestInit): Promise<T | undefined> {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);

        if (!response.ok) {
            //const errorBody = await response.json();
            console.log(response);
            //const error = new ErrorData(errorBody.status, errorBody.message);

            throw response.status;
        }

        if (response.status === HttpStatus.NO_CONTENT) {
            return undefined;
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw (error);
    }
}