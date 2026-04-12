# 💰 Budget Manager (가계부 웹 서비스)

> Vue 3 기반 SPA 가계부 서비스  
> 수입/지출 관리 및 월별 재정 요약 기능 제공

---

## 👥 Team

| 이름 | 역할 | 담당 기능 |
|------|------|----------|
| 정민규 (PM) | 구조 설계 / 데이터 관리 | 전체 구조, Pinia 설계 |
| 김민건 | 기능 개발 | 수입/지출 등록 |
| 황하연 | 기능 개발 | 거래 내역 조회 |
| 조수현 | 기능 개발 | 월별 요약 |
| 주유정 | 기능 개발 | 월별 요약 |

---

## 📅 Project Period

- 2026.04.07 ~ 2026.04.13 (5일)

---

## 🎯 Project Goal

- Vue 3 기반 SPA 구조 이해
- 컴포넌트 기반 설계 및 상태 관리 학습
- 팀 협업 경험 (Git, 역할 분리, 충돌 관리, 이슈 해결 능력 및 커뮤니케이션 능력 증진)

---

## ⚙️ Tech Stack

| Category          | Stack                         | Description                  |
| ----------------- | ----------------------------- | ---------------------------- |
| Frontend          | Vue 3, JavaScript, HTML5, CSS | Vue 3 기반 SPA 개발 및 컴포넌트 구조 설계 |
| State Management  | Pinia                         | 전역 상태 관리                     |
| Routing           | Vue Router                    | 페이지 라우팅 및 SPA 구조 구현          |
| API Communication | Axios                         | JSON Server와 HTTP 통신         |
| Backend (Mock)    | JSON Server                   | REST API 기반 데이터 관리           |
| Build Tool        | Vite                          | 빠른 개발 환경 제공                  |
| Version Control   | Git, GitHub                   | 형상 관리 및 협업                   |
| Collaboration     | Notion              | 일정 관리 및 팀 커뮤니케이션             |
| Design            | Figma                | UI 설계 및 구조 설계                |


---

## 🧱 Project Architecture

```plaintext
User
 ↓
Vue (Component)
 ↓
Pinia (State Management)
 ↓
Axios (HTTP)
 ↓
JSON Server (DB)
```

---

## 📄 주요 기능

### 1. 수입 / 지출 기록
- 날짜, 금액, 카테고리, 메모 입력
- 거래 데이터 저장

### 2. 거래 내역 조회
- 전체 거래 리스트 조회
- 카테고리 필터 기능
- 거래 삭제 기능

### 3. 월별 재정 요약
- 월별 수입 / 지출 / 순이익 계산
- Dashboard 화면 제공

### 4. 거래 수정
- 기존 데이터 불러오기
- 수정 후 업데이트

---

## 📂 프로젝트 구조

    📁 MD_s
    ├── 📝 CODE_CONVENTION.md
    └── 📝 GITHUB_RULE.md

    📁 src
    ├── 📁 components
    │   ├── 📄 FilterBar.vue
    │   ├── 📄 Header.vue
    │   ├── 📄 Sidebar.vue
    │   ├── 📄 SummaryCard.vue
    │   ├── 📄 TransactionForm.vue
    │   ├── 📄 TransactionItem.vue
    │   └── 📄 TransactionList.vue
    │
    ├── 📁 pages
    │   ├── 📄 BudgetView.vue
    │   ├── 📄 DashboardView.vue
    │   ├── 📄 EditTransactionView.vue
    │   ├── 📄 RecordView.vue
    │   └── 📄 TransactionListView.vue
    │
    ├── 📁 router
    │   └── 📄 index.js
    │
    ├── 📁 stores
    │   └── 📄 transaction.js
    │
    ├── 📄 App.vue
    └── 📄 main.js

    기타 파일
    ├── ⚙️ db.json
    ├── 🌐 index.html
    ├── ⚙️ package.json
    └── 📄 vite.config.js

---

## 🔁 데이터 흐름

Component → Store → API → DB → Store → Component  

👉 모든 데이터는 Pinia에서 관리  
👉 컴포넌트는 UI 역할만 담당

---

## 🚀 실행 방법

### 프로젝트 실행
- npm install  
- npm run dev  

### JSON Server 실행
- npx json-server db.json  

---

## 🧠 협업 방식

- 개인 브랜치에서 작업 후 PR 진행  
- dev 브랜치 기준 통합  
- 역할 분리 기반 개발 진행  

---

## 📌 핵심 설계 원칙

- 데이터는 Store에서 관리  
- 컴포넌트는 UI만 담당  

👉 데이터는 Pinia / 화면은 Component  

---

## 📌 회고

- 역할 분리를 통해 충돌 없이 협업 가능  
- 상태 관리(Pinia)의 중요성 체감  
- 설계 단계의 중요성 이해  
