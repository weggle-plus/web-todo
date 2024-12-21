# TODO API 문서

## 스키마

https://dbdiagram.io/d/TODO-LIST-675f8c57e763df1f0004415a


## API 엔드포인트

### TODO

#### TODO 생성
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

#### 모든 TODO 조회
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

#### 특정 TODO 조회
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

#### TODO 수정
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

#### TODO 상태 변경
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

#### TODO 삭제
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


