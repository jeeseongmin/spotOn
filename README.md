# SpotOn

평택온누리교회 대학청년부 장소 예약 시스템

> 개발기간 : 2024.02 ~

## Repository

- **Frontend**: https://github.com/sky01sun/spotOnFrontEnd
- **Backend**: https://github.com/sky01sun/spotOnBackend

---

## Tech Stack

### Frontend

| 항목 | 기술 |
|------|------|
| Framework | React 18.2 |
| Language | TypeScript 5.2 |
| Build Tool | Vite 5.2 |
| Styling | Tailwind CSS 3.4 |
| State Management | Zustand 4.5 |
| Routing | React Router DOM 6.22 |
| Form | React Hook Form 7.51 |
| HTTP Client | Axios 1.7 |
| UI Documentation | Storybook 8.0 |

### Backend

| 항목 | 기술 |
|------|------|
| Framework | NestJS 11.0 |
| Language | TypeScript 5.7 |
| Database | MySQL (mysql2 3.14) |
| ORM | TypeORM 0.3 |
| Authentication | Passport + JWT |
| Validation | class-validator, class-transformer |

---

## 프론트엔드 개발팀 소개

| 지성민                                         | 최희라                                 |
| ---------------------------------------------- | -------------------------------------- |
| [@jeeseongmin](https://github.com/jeeseongmin) | [@Heeeera](https://github.com/Heeeera) |

---

## Introduce

### 불편함

이전까지 여러 공동체 및 개인이 교회 내 장소를 사용하는 데에 있어 크고 작은 불편함들이 있었습니다.

예를 들어 성인순 순모임, 대학청년부 순모임, 대학청년부 예배팀 연습 이외에도 부서 별 회의라던지 크고 작은 공동체의 모임들을 교회 내에서 진행하고자 했을 때에, 해당 시간에 어떤 장소를 사용할 수 있는지 각 장소의 관계자들에게 일일이 연락하여 확인하는 절차를 거쳐야했으며, 혹은 해당 시간에 그 장소를 직접 방문하고나서야 사용 여부를 판단할 수 있었습니다.

또한 그렇게 확인하는 절차를 가짐에도 불구하고 동일한 시간과 장소를 사용하려는 계획을 갖고 있던 사람들이 중복되어 **작은 충돌**이 있기도 했습니다.

### 개선에 대한 고민

그렇기 때문에 평택온누리 개발팀에서는 해당 예약 시스템을 체계적으로 만들어, 온누리 교회 성도들이 번거롭지 않고 편리하게 교회 내 장소들을 이용할 수 있도록 하고 싶다는 생각을 하게 되었습니다.

그래서 먼저 저희 선에서 간단하게 기획을 한 뒤에 목사님과 교회 관계자 분들의 동의를 얻고 제대로 된 웹 어플리케이션 개발을 시작하고자 하였습니다.

---

## Getting Started

### 1. 의존성 설치

```bash
# 루트 및 모든 프로젝트 의존성 설치
npm run install:all
```

### 2. 개발 서버 실행

```bash
# Frontend + Backend 동시 실행
npm run dev

# Frontend만 실행
npm run dev:frontend

# Backend만 실행
npm run dev:backend
```

---

## Frontend

### 개발 환경 실행

```bash
cd frontend
npm run dev
```

### 배포 절차

#### 1) 프로덕션 빌드

```bash
npm run build:prd
```

#### 2) 서버 업로드

FileZilla를 사용하여 빌드된 파일을 서버에 업로드합니다.

- **업로드 경로**: `/var/www/html/spoton/dist`

#### 3) Nginx 재기동

```bash
sudo service nginx restart
```

### 기타 스크립트

```bash
# 개발 빌드
npm run build:dev

# Storybook 실행
npm run storybook

# 린트 검사
npm run lint
```

---

## Backend

### 개발 환경 실행

```bash
cd backend
npm run start:dev
```

### 프로덕션 빌드 및 실행

```bash
# 빌드
npm run build

# 프로덕션 실행
npm run start:prod
```

### 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

---

## Project Structure

```
spoton/
├── frontend/          # React + Vite 프론트엔드
├── backend/           # NestJS 백엔드
├── package.json       # 루트 패키지 (동시 실행 스크립트)
└── README.md
```
