# 프로젝트 소개

# 프로젝트 요구사항

[1차 미션]

- TODO를 작성할수 있다.
- TODO를 수정할수 있다.
- TODO의 상태를 변경할수 있다.
  - 진행중
  - 완료
- TODO를 제거할수 있다.

[2차 미션]

- 회원가입을 구현한다.
  - 아이디와 비밀번호만 정보를 받는다.
    - 아이디 중복체크가 가능해야 한다.
    - input이 포커스가 벗어나는 경우 validate가 동작하도록 한다.
  - 비밀번호의 규칙은 아래와 같다.
    - 8자 이상이고, 특수문자와 숫자, 영문자가 모두 존재해야 한다.
- 로그인
  - 아이디와 비밀번호를 입력받아 로그인이 가능하도록 한다.
- 인가
  - 로그인을 하지 않은 사용자는 TODO 사이트에 들어갈수 없다. TODO 주소로 접근 시, 로그인을 하지 않은 사용자는 로그인페이지로 리다이렉트를 진행해주세요.

[3차작업]

- 팀 TODO
  - 팀을 생성할수 있다.
  - 팀원을 초대할수 있다. (아이디로 초대)
  - 팀을 삭제할수 있다.
  - 초대받지 않은 사용자는 해당 팀의 TODO를 확인할수 없다.

# 문서

[API 명세](/backend/docs/api.md)
[아키텍처](/backend/docs/architecture.md)

# 설치 및 실행 방법

## 백엔드

```
cd backend
npm install
npm run start
```

- DB연결에 성공하면 "MariaDB 연결 성공" 메세지가 나타남

## 프론트엔드

```
cd frontend
npm install
npm run build
```

- frontend/src/pages/index.html을 실행

# 참여자

[@YooJini](https://github.com/YooJini)
[@FeelsBotMan](https://github.com/FeelsBotMan)
