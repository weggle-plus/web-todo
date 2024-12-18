# TODO API 문서

## 스키마

https://dbdiagram.io/d/TODO-LIST-675f8c57e763df1f0004415a


## API 엔드포인트

### TODO

#### 1. TODO 생성
새로운 TODO 항목을 생성합니다.

- **URL:** `/todos`
- **Method:** `POST`
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| title | 선택 | TODO 제목 |
| content | 선택 | TODO 내용 |
| status | 선택 | TODO 상태 (in-progress, done) |


```json
{
  "title": "할 일 제목"
} 
```

- **성공 응답 (201 Created):**  
```json
{
  "id": "todo_id",
  "title": "할 일 제목",
  "status": "in-progress",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:00:00.000Z",
  "completedAt": null
}  
```
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "할 일을 생성하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}  
```

#### 2. 모든 TODO 조회
- 등록된 모든 TODO 항목을 조회합니다.
- 정렬순서는 생성일자 오름차순

- **URL:** `/todos`
- **Method:** `GET`
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (200 OK):**  
```json
[
  {
    "id": "todo_id1",
    "title": "할 일 1",
    "status": "in-progress",
    "content": "할 일 내용 1",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z",
    "completedAt": null
  },
  {
    "id": "todo_id2",
    "title": "할 일 2",
    "status": "done",
    "content": "할 일 내용 2",
    "createdAt": "2024-03-15T12:30:00.000Z",
    "updatedAt": "2024-03-15T13:00:00.000Z",
    "completedAt": "2024-03-15T12:30:00.000Z"
  }
]  
```
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "할 일들을 조회하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
} 
```

#### 3. 특정 TODO 조회
ID를 기반으로 특정 TODO 항목을 조회합니다.

- **URL:** `/todos/:id`
- **Method:** `GET`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (200 OK):**  
```json
{
  "id": "todo_id",
  "title": "할 일 제목",
  "status": "in-progress",
  "content": "할 일 내용",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:00:00.000Z",
  "completedAt": null
}  
```
- **실패 응답 (404 Not Found):**  
```json
{
  "message": "할 일을 조회하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}  
```

#### 4. TODO 수정
특정 TODO 항목의 내용을 수정합니다.

- **URL:** `/todos/:id`
- **Method:** `PUT`
- **URL 파라미터:** id (TODO의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| title | 선택 | 수정된 할 일 제목 |
| content | 선택 | 수정된 할 일 내용 |

```json
{
  "title": "수정된 할 일 제목"
}  
```
- **성공 응답 (200 OK):**  
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
- **실패 응답 (404 Not Found):**  
```json
{
  "message": "할 일을 업데이트하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}  
```

#### 5. TODO 상태 변경
특정 TODO 항목의 상태만 변경합니다.

- **URL:** `/todos/:id`
- **Method:** `PATCH`
- **URL 파라미터:** id (TODO의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  
  - 없음

- **성공 응답 (200 OK):**  
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
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "할 일의 상태를 업데이트하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}  
```

#### 6. TODO 삭제
특정 TODO 항목을 삭제합니다.

- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (204 No Content):**
  - 응답 본문 없음
- **실패 응답 (404 Not Found):**  
```json
{
  "message": "할 일을 삭제하는 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
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

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| email | 필수 | 사용자 이메일 |
| password | 필수 | 사용자 비밀번호 |
| username | 선택 | 사용자 이름 |

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "user_name"
}
```
- **성공 응답 (201 Created):**
```json
{
  "message": "회원가입이 완료되었습니다.",
  "user": {
    "email": "user@example.com",
    "username": "user_name"
  }
}
```
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "회원가입 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 2. 로그인
사용자 인증을 수행하고 JWT 토큰을 발급합니다.

- **URL:** `/users/login`
- **Method:** `POST`
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| email | 필수 | 사용자 이메일 |
| password | 필수 | 사용자 비밀번호 |

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **성공 응답 (200 OK):**
```json
{
  "message": "로그인이 완료되었습니다.",
  "token": "JWT 토큰"
}
```

#### 3. 프로필 조회
사용자의 프로필 정보를 조회합니다.

- **URL:** `/users/:userId`
- **Method:** `GET`
- **URL 파라미터:** userId (사용자의 고유 식별자)
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:** 
  - 요청 본문 없음

- **성공 응답 (200 OK):**
```json
{
  "message": "프로필 조회가 완료되었습니다.",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "user_name"
  }
}
```
- **실패 응답 (401 Unauthorized):**  
```json
{
  "message": "프로필 조회 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 4. 프로필 업데이트
사용자의 프로필 정보를 업데이트합니다.

- **URL:** `/users/profile`
- **Method:** `PUT`
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| username | 선택 | 업데이트된 사용자 이름 |
| password | 선택 | 업데이트된 사용자 비밀번호 |

```json
{
  "username": "updated_user_name"
}
```

- **성공 응답 (200 OK):**
```json
{
  "message": "프로필 업데이트가 완료되었습니다.",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "updated_user_name"
  }
}
```
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "프로필 업데이트 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

### TEAM

- 유저는 동시에 여러 팀에 속할 수 있습니다.
- 역할은 세 가지가 있습니다.
  - manager: 팀 관리자
  - mentor: 멘토
  - member: 멤버

#### 1. 팀 생성

- **URL:** `/teams`
- **Method:** `POST`
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| name | 필수 | 팀 이름 |
| description | 선택 | 팀 설명 |

```json
{
  "name": "팀 이름"
}
```

- **성공 응답 (201 Created):**
```json
{
  "message": "팀이 생성되었습니다.",
  "team": {
    "id": "team_id",
    "name": "팀 이름"
  }
}
```

- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "팀 생성 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 2. 팀 조회 

- **URL:** `/teams/:teamId`
- **Method:** `GET`
- **URL 파라미터:** teamId (팀의 고유 식별자)
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (200 OK):**
```json
{
  "message": "팀이 조회되었습니다.",
  "team": {
    "id": "team_id",
    "name": "팀 이름",
    "members": [
      {
        "username": "user_name1",
        "role": "manager"
      },
      {
        "username": "user_name2",
        "role": "member"
      }
    ]
  }
}
```

- **실패 응답 (404 Not Found):**  
```json
{
  "message": "팀 조회 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 3. 팀 업데이트

- **URL:** `/teams/:teamId`
- **Method:** `PUT`
- **URL 파라미터:** teamId (팀의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| name | 선택 | 업데이트된 팀 이름 |
| description | 선택 | 업데이트된 팀 설명 |

```json
{
  "name": "업데이트된 팀 이름"
}
```

- **성공 응답 (200 OK):**
```json
{
  "message": "팀이 업데이트되었습니다.",
  "team": {
    "id": "team_id",
    "name": "업데이트된 팀 이름",
    "members": [
      {
        "username": "user_name1",
        "role": "manager"
      },
      {
        "username": "user_name2",
        "role": "member"
      }
    ]
  }
}
```

- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "팀 업데이트 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 4. 팀 삭제

- **URL:** `/teams/:teamId`
- **Method:** `DELETE`
- **URL 파라미터:** teamId (팀의 고유 식별자)
- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (204 No Content):**
  - 응답 본문 없음
- **실패 응답 (404 Not Found):**  
```json
{
  "message": "팀 삭제 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 5. 팀 멤버 추가

- **URL:** `/teams/:teamId`
- **Method:** `POST`
- **URL 파라미터:** teamId (팀의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| userId | 필수 | 추가할 사용자의 ID |
| role | 선택 | 사용자의 역할 (manager, mentor, member) 기본값 member |

```json
{
  "userId": "user_id",
  "role": "member"
}
```

- **성공 응답 (200 OK):**
```json
{
  "message": "팀 멤버가 추가되었습니다.",
  "team": {
    "id": "team_id",
    "name": "팀 이름",
    "members": [
      {
        "username": "user_name1",
        "role": "manager"
      },
      {
        "username": "user_name2",
        "role": "member"
      }
    ]
  }
}
```
- **실패 응답 (400 Bad Request):**  
```json
{
  "message": "팀 멤버 추가 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 6. 팀 멤버 역할 업데이트

- **URL:** `/teams/:teamId/:userId`
- **Method:** `PATCH`
- **URL 파라미터:** teamId (팀의 고유 식별자), userId (사용자의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Content-Type | 필수 | application/json |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **Request Body:**  

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| role | 필수 | 업데이트할 역할 (manager, mentor, member) |

```json
{
  "role": "mentor"
}
```

- **성공 응답 (200 OK):**
```json
{
  "message": "팀 멤버 역할이 업데이트되었습니다.",
  "team": {
    "id": "team_id",
    "name": "팀 이름",
    "members": [
      {
        "username": "user_name1",
        "role": "mentor"
      }
    ]
  }
}
```

- **실패 응답 (400 Bad Request):**  

```json
{
  "message": "팀 멤버 역할 업데이트 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```

#### 7. 팀 멤버 삭제

- **URL:** `/teams/:teamId/:userId`
- **Method:** `DELETE`
- **URL 파라미터:** teamId (팀의 고유 식별자), userId (사용자의 고유 식별자)

- **Request Header:** 

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| Authorization | 필수 | Bearer <JWT 토큰> |

- **성공 응답 (204 No Content):**
  - 응답 본문 없음
- **실패 응답 (404 Not Found):**  
```json
{
  "message": "팀 멤버 삭제 중 오류가 발생했습니다.",
  "error": "구체적인 오류 메시지"
}
```
