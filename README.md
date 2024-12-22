## WEB-TODO

JWT를 이용한 TODO 프로젝트  

### 시연 영상

- 회원 가입
![signup](https://github.com/user-attachments/assets/64702543-bb0a-4c9c-8f15-21db75b8228b)

- 로그인
![login](https://github.com/user-attachments/assets/20e193bd-c540-48c0-946d-0b1bd57c7647)

- 할 일 목록
![todo](https://github.com/user-attachments/assets/c0db21ab-5018-447c-8958-3cf68b5efc74)

### 구현 기능

- ✅TODO 작성, 수정, 제거, 상태변경(진행중 완료)
- ✅회원가입을 구현한다.
    - ✅아이디와 비밀번호만 정보를 받는다.
        - ✅아이디 중복체크가 가능해야 한다.
        - ✅input이 포커스가 벗어나는 경우 validate가 동작하도록 한다.
    - ✅비밀번호의 규칙은 아래와 같다.
        - ✅8자 이상이고, 특수문자와 숫자, 영문자가 모두 존재해야 한다.
    - ✅로그인
        - ✅아이디와 비밀번호를 입력받아 로그인이 가능하도록 한다.
    - ✅인가
        - ✅로그인을 하지 않은 사용자는 TODO 사이트에 들어갈수 없다. ✅TODO 주소로 접근 시, 로그인을 하지 않은 사용자는 로그인페이지로 리다이렉트를 진행한다.

### 설치 및 실행방법

**FRONTEND**

```bash
npm install
npm start
```

**BACKEND**

```bash
npm install
npm start
```

### 프로젝트 구조

**FRONTEND**

```markdown
frontend
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.js
   ├─ App.test.js
   ├─ api.js
   ├─ assets
   │  └─ checked.png
   ├─ component
   │  ├─ DeleteCheckModal.js
   │  ├─ DoneList.js
   │  ├─ Input.js
   │  └─ TodoList.js
   ├─ index.css
   ├─ index.js
   ├─ logo.svg
   ├─ reportWebVitals.js
   └─ setupTests.js
```

**BACKEND**

```markdown
backend
├─ .env
├─ BE-README.md
├─ app.js
├─ database
│  ├─ db.js
│  ├─ init.js
│  └─ todos.db
├─ package-lock.json
├─ package.json
├─ routes
│  ├─ login.js
│  ├─ todos.js
│  └─ users.js
└─ views
   ├─ error.pug
   └─ todos.pug
```

### 개선할 여지가 있는 사항

1. 입력한 두 비밀번호가 동일하지 않을 경우
개발자 도구등을 통해서 FE 비밀번호 검사를 우회할 가능성이 있다.
FE와 BE 모두 검증하는 것이 보안과 데이터 무결성을 위해 권장된다.

따라서, req에 passwordConfirmation을 추가하여 signup.js안에 아래와 같은 검증을 추가할 수 있다.

```
if (password !== passwordConfirmation) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Passwords do not match" });
}
```