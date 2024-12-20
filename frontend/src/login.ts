import { fetchData, HttpStatus, errorData } from "./api";

interface requestBody{
    username: string;
    password: string;
}

interface responseBody{
    username: string;
    token: string;
}

// 로그인
const loginButton = document.querySelector('#login-button') as HTMLButtonElement;
loginButton.addEventListener("click", () => {
    const id = document.querySelector('#login-input-id') as HTMLInputElement;
    const pw = document.querySelector('#login-input-pw') as HTMLInputElement;
    requestLogin(id.value, pw.value);
})

async function requestLogin(id: string, password: string) {
    const request: requestBody = { username: id, password: password };

    try {
        const response = await fetchData<responseBody>(`users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response) {
            alert(`${response.username}님 환영합니다!`);
            localStorage.setItem('token', response.token);
            window.location.href='./index.html';
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}