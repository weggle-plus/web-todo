# 프로젝트 아키텍처 문서

## 디렉토리 구조

```
backend/src/
├── routes/ # 라우팅 정의
├── controllers/ # 요청/응답 처리
├── services/ # 비즈니스 로직
├── models/ # 데이터 모델
│ ├── interfaces/ # 추상화된 인터페이스
│ └── mariadb/ # MariaDB 구현체
└── utils/ # 유틸리티
```

## 아키텍처 개요

### 계층형 아키텍처
요청 흐름:
```
Routes → Controllers → Services → Repositories → Database
```
각 계층의 역할:
- **Routes**: API 엔드포인트 정의 및 미들웨어 연결
- **Controllers**: HTTP 요청/응답 처리
- **Services**: 비즈니스 로직 처리
- **Repositories**: 데이터 접근 추상화
- **Models**: 데이터 스키마 및 유효성 검증

### 주요 디자인 패턴

#### 1. 레포지토리 패턴
- 레포지토리는 데이터 처리와 관련된 작업만 책임지고, 비즈니스 로직은 서비스 계층에서 처리한다.
```javascript
// interfaces/TodoRepository.js
class TodoRepository {
    async create(todoData) {}
    async findById(todoId) {}
    async findByUserId(userId) {}
    // ...
}
```
#### 2. 의존성 주입
- 객체가 특정 클래스에 강하게 의존하지 않도록 함으로써 코드의 유연성과 재사용성을 높인다.
```javascript
class TodoService {
    constructor(todoRepository, userRepository, teamRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }
}
```

## 향후 고려사항

1. **도메인 주도 설계(DDD) 적용**
   - 복잡한 비즈니스 규칙 처리
   - 도메인 이벤트 활용

2. **캐싱 전략**
   - 자주 조회되는 데이터 캐싱
   - 성능 최적화

3. **마이크로서비스 고려**
   - 서비스 분리 가능성 검토
   - API 게이트웨이 도입