import { fetchData, HttpStatus } from "../api/api";

interface requestBody {
    username: string;
    password: string;
}

interface responseBody {
    username: string;
    token: string;
}

const idInput = document.querySelector('#login-input-id') as HTMLInputElement;
const pwInput = document.querySelector('#login-input-pw') as HTMLInputElement;
const span = document.querySelector('span') as HTMLSpanElement;

[idInput, pwInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            if (idInput.value && pwInput.value) {
                requestLogin(idInput.value, pwInput.value);
            }
        }
    });
});

// 로그인
const loginButton = document.querySelector('#login-button') as HTMLButtonElement;
loginButton.addEventListener("click", () => {
    if (idInput.value && pwInput.value) {
        requestLogin(idInput.value, pwInput.value);
    } 
})

idInput.addEventListener('focus', () => {
    idInput.classList.remove('error');
    pwInput.classList.remove('error');
    span.style.display = 'none';
});

pwInput.addEventListener('focus', () => {
    pwInput.classList.remove('error');
    idInput.classList.remove('error');
    span.style.display = 'none';
});

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
            window.location.href = './index.html';
        }
    } catch (statusCode) {
        if (statusCode === HttpStatus.UNAUTHORIZED) {
            span.style.display = 'flex';
            idInput.classList.add('error');
            pwInput.classList.add('error');
        }
        else
            alert(`unhandled error ${statusCode}`);
    }
}