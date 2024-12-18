# '프로그래머스 데브코스 풀스택 5기, 미니 프로젝트 - Todolist 만들기'

## 프로젝트 개괄

 - 'Todolist'를 제작해보는 풀스택 역량 향상 프로젝트, 1차

## ✔️ 프로젝트 상세 설명 - 1차 미션

- TODO를 작성할 수 있다.
- TODO를 수정할 수 있다.
- TODO의 상태를 변경할 수 있다.
    - 진행중
    - 완료
- TODO를 제거할 수 있다.

## ✔️ 프로젝트 시연

![시연 영상](https://velog.velcdn.com/images/skyoffly/post/2ea9c9ac-80d1-44f0-a68e-9eb73365efee/image.gif)

## 사용기술
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black)
![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React.js](https://img.shields.io/badge/-React.js-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)

## 프로젝트 소개

- 작업은 1차, 2차, 3차 순서대로 진행하시고, 1차를 하는동안 2차를 고려하지 말고, 2차를 하는동안 3차를 고려하지 말고 각 차수가 잘 끝날수 있게 하세요.
- 각 차수의 내용만을 완성시키는것만으로도 작은 서비스가 될 수 있습니다. 그러나 2차를 고려하게 되는 순간 1차는 완성하기가 어려워질 수 있어요.
- 이전 공지와 동일하게 1차 범위는 12월 18일에 제출해주시면 됩니다.
- 2, 3차 범위는 12월 22일 일요일까지 가능한 선까지 진행해주시면 좋을거 같습니다. 리뷰는 그 다음주에 진행하겠습니다.
- 간단한 개인 프로젝트의 포폴을 만드는게 목적이기 때문에 부담갖지 말고 할수 있는 선까지 진행해주세요.

## 프로젝트 API/DB 설계

 - [노션 페이지](https://www.notion.so/3-DB-API-3a81838927ba430e970d4d9db8235d7d)

## 구현 기능

### - TODO 작성 
### - TODO를 수정
### - TODO의 상태 변경
### - TODO를 제거

## 프로젝트 구조
### 백엔드
```bash
📦backend
 ┣ 📂controller
 ┃ ┗ 📜indexController.js
 ┃ 📂routes
 ┃ ┣ 📜index.js
 ┃ ┗ 📜users.js
 ┣ 📜app.js
 ┗ 📜mariadb.js
```

### 프론트엔드
```bash
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜App.css
 ┃ ┃ ┗ 📜index.css
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Modal.module.css
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┣ 📜Sidebar.module.css
 ┃ ┃ ┣ 📜Sidebar.tsx
 ┃ ┃ ┣ 📜TodoInput.module.css
 ┃ ┃ ┣ 📜TodoInput.tsx
 ┃ ┃ ┣ 📜TodoItem.module.css
 ┃ ┃ ┣ 📜TodoItem.tsx
 ┃ ┃ ┣ 📜TodoList.module.css
 ┃ ┃ ┗ 📜TodoList.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useModal.ts
 ┃ ┃ ┗ 📜useTodoList.ts
 ┃ ┣ 📂service
 ┃ ┃ ┗ 📜todoAPI.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜main.tsx
 ┗ ┗ 📜types.ts
```