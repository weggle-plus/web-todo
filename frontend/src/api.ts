const BASE_URL = 'http://localhost:3000/todos';

export async function fetchData<T>(url?: string, options?: RequestInit): Promise<T|null> {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        // 응답 본문 없는 경우
        if (response.status === 204){
            return null;
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    }
}