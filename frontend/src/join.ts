import { fetchData, HttpStatus, errorData } from "./api";

interface requestBody{
    username: string;
    password: string;
}

interface responseBody{
    username: string;
    token:string;
}

// 회원 가입
const joinButton = document.querySelector('#join-button') as HTMLButtonElement;
joinButton.addEventListener("click", () => {
    const id = document.querySelector('#join-input-id') as HTMLInputElement;
    const pw = document.querySelector('#join-input-pw') as HTMLInputElement;
    requestJoin(id.value, pw.value);
})

async function requestJoin(id: string, password: string) {
    const request: requestBody = { username: id, password: password };

    try {
        const response = await fetchData<responseBody>(`users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response) {
            alert(`${response.username}님 회원가입 완료!`);
            window.location.href='./login.html';
        }
    } catch (error) {
       alert(error);
    }
}