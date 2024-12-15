# TODO API 문서

## 스키마

### TODO 스키마
src/models/interfaces/TodoSchema.js 참조

## API 엔드포인트

### 1. TODO 생성
새로운 TODO 항목을 생성합니다.

- **URL:** `/todos`
- **Method:** `POST`
- **Request Body:**  ```json
  {
    "title": "할 일 제목"
  }  ```
- **성공 응답 (201 Created):**  ```json
  {
    "id": "todo_id",
    "title": "할 일 제목",
    "status": "in-progress",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z",
    "completedAt": null
  }  ```
- **실패 응답 (400 Bad Request):**  ```json
  {
    "message": "할 일을 생성하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```

### 2. 모든 TODO 조회
등록된 모든 TODO 항목을 조회합니다.

- **URL:** `/todos`
- **Method:** `GET`
- **성공 응답 (200 OK):**  ```json
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
      "createdAt": "2024-03-15T12:00:00.000Z",
      "updatedAt": "2024-03-15T12:00:00.000Z",
      "completedAt": "2024-03-15T12:30:00.000Z"
    }
  ]  ```
- **실패 응답 (400 Bad Request):**  ```json
  {
    "message": "할 일들을 조회하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```

### 3. 특정 TODO 조회
ID를 기반으로 특정 TODO 항목을 조회합니다.

- **URL:** `/todos/:id`
- **Method:** `GET`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **성공 응답 (200 OK):**  ```json
  {
    "id": "todo_id",
    "title": "할 일 제목",
    "status": "in-progress",
    "content": "할 일 내용",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z",
    "completedAt": null
  }  ```
- **실패 응답 (404 Not Found):**  ```json
  {
    "message": "할 일을 조회하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```

### 4. TODO 수정
특정 TODO 항목의 내용을 수정합니다.

- **URL:** `/todos/:id`
- **Method:** `PUT`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **Request Body:**  ```json
  {
    "title": "수정된 할 일 제목",
  }  ```
- **성공 응답 (200 OK):**  ```json
  {
    "id": "todo_id",
    "title": "수정된 할 일 제목",
    "status": "done",
    "content": "수정된 할 일 내용",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T13:30:00.000Z",
    "completedAt": "2024-03-15T12:30:00.000Z"
  }  ```
- **실패 응답 (404 Not Found):**  ```json
  {
    "message": "할 일을 업데이트하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```

### 5. TODO 상태 변경
특정 TODO 항목의 상태만 변경합니다.

- **URL:** `/todos/:id/status`
- **Method:** `PATCH`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **Request Body:**  ```json
  {
    "status": "done"
  }  ```
- **성공 응답 (200 OK):**  ```json
  {
    "id": "todo_id",
    "title": "할 일 제목",
    "status": "done",
    "content": "할 일 내용",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:30:00.000Z",
    "completedAt": "2024-03-15T12:30:00.000Z"
  }  ```
- **실패 응답 (400 Bad Request):**  ```json
  {
    "message": "할 일의 상태를 업데이트하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```

### 6. TODO 삭제
특정 TODO 항목을 삭제합니다.

- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **URL 파라미터:** id (TODO의 고유 식별자)
- **성공 응답 (204 No Content):**
  - 응답 본문 없음
- **실패 응답 (404 Not Found):**  ```json
  {
    "message": "할 일을 삭제하는 중 오류가 발생했습니다.",
    "error": "구체적인 오류 메시지"
  }  ```




