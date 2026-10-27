# JWT 게시판 (JWT-Assignment)

웹서비스설계 수업의 JWT 인증 및 접근 제어 구현 과제입니다. React와 Express를 사용하여 게시글을 작성·조회·수정·삭제할 수 있는 웹서비스를 구현했습니다.

## 1. 작성자와 서비스 소개

- 학번: [202212238]
- 이름: [정성수]
- GitHub: https://github.com/wjdtjdtn222-coder/JWT-Assignment
- 기술 조합: React + Express
- 데이터 저장: SQLite

이 서비스는 JWT 기반 로그인과 게시글 작성자 권한 관리를 학습하기 위한 게시판입니다. 사용자는 게시글 목록과 상세 내용을 조회할 수 있으며, 로그인한 사용자는 게시글을 작성할 수 있습니다. 게시글 수정과 삭제는 작성자 본인에게만 허용됩니다. 서버에서는 JWT 검증과 작성자 확인을 수행하여 다른 사용자의 게시글을 임의로 변경하지 못하도록 합니다.

**주요 기능**
- 게시글 목록 및 상세 조회
- 테스트 계정을 이용한 로그인과 JWT 발급
- Bearer 토큰을 이용한 사용자 인증
- 게시글 작성 및 작성자 정보 저장
- 작성자 본인의 게시글 수정·삭제
- 다른 사용자 게시글의 수정·삭제 제한
- JWT 만료 및 인증 오류 처리
- 로그인 상태에 따른 화면 변경

## 2. 보고서와 테스트 증거

- [구현 보고서 PDF](docs/report.pdf)
- [테스트 증거](docs/evidence/)

구현 보고서에는 JWT 인증 과정, 주요 구현 내용과 API 테스트 결과를 정리하고, AI 활용 보고서에는 AI의 지원 범위와 직접 수행한 검증 과정을 구분하여 기술합니다. 테스트 증거는 화면 캡처와 응답 기록을 중심으로 정리합니다.

> 최종 제출 전에 `docs/report.pdf`와 `docs/evidence/`를 추가하고 링크를 확인해야 합니다.

## 3. 프로젝트 구조

```text
JWT-Assignment/
├── README.md
├── .gitignore
├── backend-express/     # Express 백엔드
├── frontend-react/      # React 프론트엔드
└── docs/                # 보고서 및 테스트 증거
```

`backend-express`는 서버와 JWT 인증 기능을 담당하고, `frontend-react`는 게시판 화면을 담당합니다. `docs`에는 보고서와 테스트 증거를 저장합니다.

## 4. 실행 환경

| 항목 | 사용 환경 및 버전 |
|---|---|
| 운영체제 | Windows [버전 확인 필요] |
| Node.js | [실제 버전 확인 필요] |
| 프론트엔드 | React [버전 확인 필요] |
| 프론트 빌드 도구 | Vite [버전 확인 필요] |
| 백엔드 | Express [버전 확인 필요] |
| JWT 라이브러리 | jsonwebtoken [버전 확인 필요] |
| 데이터 저장 | SQLite |
| 패키지 관리 | npm |

## 5. 설치 및 실행

### 5.1 저장소 복제

```powershell
git clone https://github.com/wjdtjdtn222-coder/JWT-Assignment.git
cd JWT-Assignment
```

Node.js와 npm이 설치되어 있어야 합니다.

### 5.2 백엔드 환경설정

프로젝트 루트에서 다음 명령을 실행합니다.

```powershell
cd backend-express
npm ci
Copy-Item .env.example .env
```

JWT 서명에 사용할 비밀 키를 생성합니다.

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

생성된 문자열을 `backend-express/.env` 파일의 `JWT_SECRET` 값으로 설정합니다. 다음은 설정 예시이며 실제 키를 공개하지 않습니다.

```dotenv
JWT_SECRET=여기에_생성한_64자리_16진수_문자열
JWT_ISSUER=webservice-class
JWT_AUDIENCE=board-api
TOKEN_TTL=90
DB_FILE=data/board.sqlite
PORT=8000
```

- `JWT_SECRET`: JWT 서명 및 검증에 사용하는 서버 비밀 키
- `JWT_ISSUER`: 토큰 발급자
- `JWT_AUDIENCE`: 토큰 대상
- `TOKEN_TTL`: 토큰 유효 시간(초). 만료 테스트 시 값을 줄이고 서버를 재시작합니다.
- `DB_FILE`: SQLite 데이터베이스 파일 경로
- `PORT`: 백엔드 서버 포트

실제 `.env` 파일과 비밀 키는 GitHub에 업로드하지 않습니다. 환경변수 이름 및 기본값은 실제 `.env.example`과 대조하여 최종 확인해야 합니다.

### 5.3 백엔드 실행

`backend-express` 폴더에서 다음 명령을 실행합니다.

```powershell
npm start
```

개발 중 실행 명령은 `backend-express/package.json`의 스크립트를 확인합니다.

- 백엔드 주소: http://127.0.0.1:8000
- 상태 확인 경로: `/api/health` [실제 지원 여부 확인 필요]

### 5.4 프론트엔드 설치 및 빌드

백엔드를 실행한 상태에서 새 터미널을 열고, **프로젝트 루트**에서 다음 명령을 실행합니다.

```powershell
cd frontend-react
npm ci
npm run build
npm run preview
```

- 빌드 결과 확인 주소: http://127.0.0.1:4173

개발 모드로 실행할 경우:

```powershell
npm run dev
```

- 개발 모드 주소: http://127.0.0.1:5173

Vite의 `/api` 프록시 설정은 `frontend-react/vite.config.js`에서 확인합니다. 빌드 미리보기(4173번 포트)에서도 API 프록시가 동작하는지 최종 검증해야 합니다.

프론트엔드와 백엔드 서버를 종료하려면 각각의 터미널에서 `Ctrl+C`를 누릅니다. 프론트엔드 코드를 변경한 후 빌드 화면에서 확인하려면 `npm run build`를 다시 실행합니다. 백엔드 코드를 변경한 경우 실행 중인 서버를 재시작합니다.

## 6. 테스트 계정 및 데이터베이스

| 사용자 | 이메일 | 비밀번호 |
|---|---|---|
| Alice | alice@class.test | Classroom!2026 |
| Bob | bob@class.test | Classroom!2026 |

위 계정은 수업 과제용 테스트 계정입니다.

**데이터베이스**
- 종류: SQLite
- 기본 경로: `backend-express/data/board.sqlite` [실제 설정 확인 필요]
- 초기화: 서버를 종료한 후 실습용 DB 파일을 삭제하고 서버를 재시작
- 서버 재시작 후 데이터 유지: T15에서 확인 절차 진행 (재시작 후 게시글 잔존 여부 최종 확인 필요)

데이터베이스 파일은 GitHub에 업로드하지 않습니다.

## 7. 구현 완료 범위

| 기능 | 상태 | 관련 파일 및 함수 |
|---|---|---|
| 공개 게시글 목록 및 상세 조회 | 구현 | `backend-express/src/app.js`, `frontend-react/src/api.js` |
| 로그인 및 JWT 발급 | 구현·확인 | `auth.js`의 `issueToken`, 로그인 API |
| JWT 검증 및 내 정보 조회 | 구현·확인 | `auth.js`의 `currentUserId`, `/api/me` |
| 게시글 작성 및 작성자 저장 | 구현·확인 | 게시글 작성 API |
| 본인 게시글 수정·삭제 | 구현·확인 | `auth.js`의 `assertOwner` |
| 타인 게시글 수정·삭제 차단 | 구현, 최종 재검증 필요 | `assertOwner`, HTTP 403 기대 |
| 토큰 만료 및 로그인 상태 해제 | 구현·확인 | `frontend-react/src/api.js` |
| 작성자에 따른 버튼 표시 | 구현·확인 | `frontend-react/src/api.js`의 `canEdit` |
| 입력 오류 및 전체 예외 처리 | 일부 검증, 추가 확인 필요 | `backend-express/src/errors.js` |

검증 시 유의사항: JWT 유효 시간이 90초이므로, 토큰 만료로 인한 HTTP 401과 권한 부족으로 인한 HTTP 403을 구분해야 합니다. 미확인 테스트 결과는 구현 보고서의 최종 증거와 대조합니다.

## 8. 테스트 방법 및 결과

### 8.1 로그인 및 JWT 발급

Alice 계정으로 로그인 API를 호출하여 JWT 발급을 확인했습니다.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "alice@class.test",
  "password": "Classroom!2026"
}
```

로그인 성공 후 발급된 토큰을 인증이 필요한 API 요청에 사용했습니다.

### 8.2 JWT 검증

`GET /api/me` 요청으로 다음 상황을 확인했습니다.

| 테스트 | 확인 결과 |
|---|---|
| 유효한 JWT | 사용자 정보 조회 성공 |
| 토큰 누락 | HTTP 401 |
| 잘못된 JWT | HTTP 401 |
| 만료된 JWT | HTTP 401 |

JWT는 `Authorization: Bearer <token>` 헤더로 전달합니다. 실제 발급된 토큰은 보고서와 GitHub에 그대로 공개하지 않습니다.

### 8.3 게시글 작성자 권한

Alice 계정으로 게시글을 작성한 뒤 수정 동작을 확인했습니다. Bob 계정으로 Alice의 게시글을 수정·삭제하는 권한 검증도 진행했습니다. 이 과정에서 JWT 만료로 HTTP 401이 발생한 경우가 있어, 유효한 Bob 토큰으로 HTTP 403 응답을 최종 재확인해야 합니다.

프론트엔드에서도 로그인 사용자와 게시글 작성자를 비교하여 다른 사용자의 글에는 수정·삭제 버튼이 표시되지 않도록 구현했으며, Bob으로 로그인했을 때 Alice 게시글의 수정 버튼이 보이지 않는 것을 확인했습니다.

### 8.4 토큰 만료와 로그아웃 상태

JWT 만료 상황을 테스트하여 서버에서 인증 오류가 발생하는 것을 확인했습니다. 프론트엔드는 HTTP 401 응답을 받으면 메모리에 저장된 로그인 정보를 초기화합니다.

### 8.5 입력값·존재하지 않는 게시글·상태 유지 테스트

빈 제목 입력에 대한 오류 응답을 확인하고(T13), 존재하지 않는 게시글 ID에 대한 조회·수정·삭제 요청에서 HTTP 404를 확인했습니다(T14). 서버 재시작 후 데이터 유지(T15), 새로고침 시 메모리 로그인 상태 초기화(T16), 비로그인 수정·삭제 요청의 HTTP 401 및 Bob의 본인 게시글 작성·수정(T17)도 단계별로 점검했습니다. 단, 각 시나리오의 모든 세부 항목을 완료한 것으로 간주하지 않으며, 남은 항목과 증거는 최종 제출 전에 확인합니다.

## 9. 핵심 구현 설명

**JWT 로그인 및 인증 흐름**

1. 사용자가 이메일과 비밀번호로 로그인합니다.
2. 서버가 사용자 정보를 확인하고 JWT를 발급합니다.
3. 프론트엔드는 발급된 JWT를 메모리에 보관합니다.
4. 인증이 필요한 API 요청에 `Authorization: Bearer <token>` 헤더를 추가합니다.
5. 서버는 JWT 서명과 만료 여부 등을 검증하여 사용자를 식별합니다.
6. 게시글 수정·삭제 시 서버에서 현재 사용자와 작성자가 일치하는지 확인합니다.
7. 작성자가 일치하지 않으면 HTTP 403 오류를 반환합니다.
8. 토큰이 만료되거나 유효하지 않아 HTTP 401이 발생하면 프론트엔드는 로그인 상태를 초기화합니다.

## 10. AI 활용 요약

**사용 도구:** ChatGPT

JWT 인증 및 게시글 접근 제어를 구현하면서 ChatGPT를 **개념 이해, 코드 작성 보조, 오류 분석, 테스트 절차 안내, 문서 정리**에 활용했습니다. 특히 Bearer 토큰 전달 방식, HTTP 401과 403의 차이, 작성자 권한 검사 흐름을 이해하는 데 참고했습니다.

테스트 과정에서는 브라우저 개발자 도구의 Console과 Network를 사용하여 요청을 직접 실행하고 응답을 확인했습니다. 토큰 만료(`TOKEN_EXPIRED`), 토큰 누락(`TOKEN_REQUIRED`), 변조된 토큰(`INVALID_TOKEN`)을 구분했으며, JavaScript 콘솔의 문법 오류도 점검했습니다.

AI가 제시한 코드는 참고 자료로 활용했으며, **실제 실행·오류 확인·기능 검증은 직접 수행**했습니다. AI의 예상 응답과 실제 결과가 다른 경우에는 실제 HTTP 상태 코드와 서버 응답을 기준으로 판단했습니다. 자세한 활용 내용과 한계는 별도 AI 활용 보고서에 정리합니다.

## 11. 제출 확인

- [ ] README의 안내 문구를 실제 내용으로 교체했다.
- [ ] 새 폴더에 clone하여 README만으로 설치·환경설정·빌드·로컬 실행했다.
- [ ] 4173번 빌드 화면에서 API 연결과 전체 필수 기능을 확인했다.
- [ ] GitHub에서 구현 보고서·AI 활용 보고서 및 테스트 증거 링크가 열린다.
- [ ] 교수자가 저장소를 열람·복제할 수 있다.
- [ ] 비밀 키·실제 토큰·DB·node_modules·.venv·target을 커밋하지 않았다.
- [ ] 최종 push 후 저장소 URL과 제출 기준 커밋 SHA를 LMS에 제출했다.
