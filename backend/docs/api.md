# TODO API 문서

## 스키마

https://dbdiagram.io/d/TODO-LIST-675f8c57e763df1f0004415a

## API 엔드포인트

### TODO

#### 유저의 TODO 생성

- **URL:** `/todos`
- **Method:** `POST`
- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Content-Type  | 필수 | application/json  |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

| 필드    | 필수 | 설명                          |
| ------- | ---- | ----------------------------- |
| title   | 필수 | TODO 제목                     |
| content | 선택 | TODO 내용                     |
| status  | 선택 | TODO 상태 (in-progress, done) |

```json
{
  "title": "할 일 제목"
}
```

- **성공 응답: 201 Created**

```json
{
  "id": 3,
  "title": "할 일 제목3",
  "status": "in-progress",
  "createdAt": "2024-12-20T03:51:35.654Z",
  "updatedAt": "2024-12-20T03:51:35.654Z"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 유저 또는 팀 존재하지 않음 404 Not Found, 인증 실패 401 Unauthorized**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### 유저의 TODO 조회

- 유저에게 소속된 모든 TODO 항목을 조회합니다.
- (팀 소속 TODO 항목 제외)
- 정렬순서는 생성일자 오름차순

- **URL:** `/todos`
- **Method:** `GET`
- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

  - 없음

- **성공 응답: 200 OK**

```json
[
  {
    "id": 2,
    "title": "할 일 제목2",
    "status": "in-progress",
    "content": null,
    "createdAt": "2024-12-20 12:50:26",
    "updatedAt": "2024-12-20 12:50:26",
    "completedAt": null
  },
  {
    "id": 1,
    "title": "할 일 제목1",
    "status": "in-progress",
    "content": null,
    "createdAt": "2024-12-20 12:48:46",
    "updatedAt": "2024-12-20 12:48:46",
    "completedAt": null
  }
]
```

- **실패 응답: 입력 오류 400 Bad Request, 인증 실패 401 Unauthorized**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### TODO 수정

특정 TODO 항목의 내용을 수정합니다.

- **URL:** `/todos/:id`
- **Method:** `PUT`
- **URL 파라미터:** id (TODO의 고유 식별자)

- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Content-Type  | 필수 | application/json  |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

| 필드    | 필수 | 설명              |
| ------- | ---- | ----------------- |
| title   | 선택 | 수정된 할 일 제목 |
| content | 선택 | 수정된 할 일 내용 |

```json
{
  "title": "수정된 할 일 제목"
}
```

- **성공 응답: 200 OK**

```json
{
  "id": "todo_id",
  "title": "수정된 할 일 제목",
  "status": "done",
  "content": "수정된 할 일 내용",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T13:30:00.000Z",
  "completedAt": "2024-03-15T12:30:00.000Z"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 인증 실패 401 Unauthorized, 존재하지 않는 TODO 404 Not Found, 유저 또는 팀 권한이 없음 403 Forbidden**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### TODO 상태 변경

특정 TODO 항목의 상태만 변경합니다.

- **URL:** `/todos/:id`
- **Method:** `PATCH`
- **URL 파라미터:** id (TODO의 고유 식별자)

- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

  - 없음

- **성공 응답: 200 OK**

```json
{
  "id": "todo_id",
  "title": "할 일 제목",
  "status": "done",
  "content": "할 일 내용",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:30:00.000Z",
  "completedAt": "2024-03-15T12:30:00.000Z"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 인증 실패 401 Unauthorized, 존재하지 않는 TODO 404 Not Found, 유저 또는 팀 권한이 없음 403 Forbidden**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### TODO 삭제

특정 TODO 항목을 삭제합니다.

- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답: 204 No Content**
  - 응답 본문 없음
- **실패 응답: 인증 실패 401 Unauthorized, 유저 또는 팀 존재하지 않음 404 Not Found, 유저 또는 팀 권한이 없음 403 Forbidden**

```json
{
  "message": "구체적인 오류 메시지"
}
```

### USER

- 유저는 두 가지 타입이 있습니다.
  - 일반 유저
  - 관리자

#### 1. 회원가입

- 새로운 사용자 계정을 생성합니다.
- 비밀번호 규칙은 아래와 같습니다.

  - 8자 이상이고, 특수문자와 숫자, 영문자가 모두 존재해야 합니다.

- **URL:** `/users/register`
- **Method:** `POST`
- **Request Header:**

| 필드         | 필수 | 설명             |
| ------------ | ---- | ---------------- |
| Content-Type | 필수 | application/json |

- **Request Body:**

| 필드     | 필수 | 설명            |
| -------- | ---- | --------------- |
| password | 필수 | 사용자 비밀번호 |
| username | 필수 | 사용자 이름     |

```json
{
  "username": "user_name",
  "password": "password123!"
}
```

- **성공 응답: 201 Created**

```json
{
  "username": "user_name"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 중복된 유저 이름 409 Conflict**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### 2. 로그인

사용자 인증을 수행하고 JWT 토큰을 발급합니다.

- **URL:** `/users/login`
- **Method:** `POST`
- **Request Header:**

| 필드         | 필수 | 설명             |
| ------------ | ---- | ---------------- |
| Content-Type | 필수 | application/json |

- **Request Body:**

| 필드     | 필수 | 설명            |
| -------- | ---- | --------------- |
| username | 필수 | 사용자 이름     |
| password | 필수 | 사용자 비밀번호 |

```json
{
  "username": "user_name",
  "password": "password123"
}
```

- **성공 응답: 200 OK**

```json
{
  "username": "user_name",
  "token": "JWT 토큰"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 인증 실패 401 Unauthorized**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### 3. 프로필 조회

사용자의 프로필 정보를 조회합니다.

- **URL:** `/users`
- **Method:** `GET`
- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

  - 요청 본문 없음

- **성공 응답: 200 OK**

```json
{
  "username": "user_name"
}
```

- **실패 응답: 인증 실패 401 Unauthorized, 존재하지 않는 유저 404 Not Found**

```json
{
  "message": "구체적인 오류 메시지"
}
```

#### 4. 프로필 업데이트

- 사용자의 프로필 정보를 업데이트합니다.
- 아이디 변경 시 토큰도 재발급해야 합니다.

- **URL:** `/users`
- **Method:** `PUT`
- **Request Header:**

| 필드          | 필수 | 설명              |
| ------------- | ---- | ----------------- |
| Content-Type  | 필수 | application/json  |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**

| 필드     | 필수 | 설명                       |
| -------- | ---- | -------------------------- |
| username | 선택 | 업데이트된 사용자 이름     |
| password | 선택 | 업데이트된 사용자 비밀번호 |

```json
{
  "username": "updated_user_name"
}
```

- **성공 응답: 200 OK**

```json
{
  "username": "updated_user_name"
}
```

- **실패 응답: 입력 오류 400 Bad Request, 인증 실패 401 Unauthorized, 권한이 없음 403 Forbidden, 존재하지 않는 유저 404 Not Found**

```json
{
  "message": "구체적인 오류 메시지"
}
```