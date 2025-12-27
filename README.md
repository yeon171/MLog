# Musicalog

[한국어](#-한국어) | [English](#-english)

---

## 한국어

### 프로젝트 소개
뮤지컬 공연과 배우 정보를 통합하고,  
관심 배우의 공연 일정과 기념일을 캘린더로 관리할 수 있는  
뮤지컬 팬을 위한 웹서비스입니다.

---

### 프로젝트 개요
- 프로젝트 유형: 개인 프로젝트
- 개발 목적: 흩어져 있는 뮤지컬 정보와 배우 스케줄을 한 곳에서 관리
- 진행 상태: 기획 및 초기 개발 단계

---

### 기획 배경
뮤지컬 팬으로서 다음과 같은 불편함을 느꼈습니다.

- 공연 정보와 배우 정보가 여러 사이트에 분산됨
- 좋아하는 배우의 출연작과 스케줄을 직접 정리해야 함
- 배우 데뷔일, 공연 n주년과 같은 기념일을 놓치기 쉬움

Musicalog는  
공연, 배우, 개인 관심 정보를 하나의 서비스로 통합하는 것을 목표로 합니다.

---

### 핵심 기능

#### 구현 / 개발 중
- 사용자 인증 (Supabase Auth)
- 뮤지컬 공연 정보 조회
- 배우 정보 조회
- 관심 배우 찜하기
- 찜한 배우의 공연 일정 캘린더 표시
- 배우 데뷔일 / 공연 n주년 자동 계산
- 개인 맞춤 알림 기능

---

### 데이터베이스 설계
- users: 사용자 정보
- actors: 배우 정보
- musicals: 공연 정보
- schedules: 공연 일정
- favorites: 사용자-배우 찜 관계
- calendars: 개인 캘린더 이벤트

---

### 기술 스택

Frontend
- Next.js
- TypeScript
- Tailwind CSS

Backend
- Supabase (PostgreSQL)
- Supabase Auth
- Java / Spring Boot (예정)

Deployment
- Vercel (예정)

---

### 실행 방법
```bash
npm install
npm run dev
