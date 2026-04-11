# GITHUB RULE

이 문서는 팀 협업을 위한 Git 규칙이다.  
목표는 “잘 쓰는 것”이 아니라 충돌 없이 안정적으로 작업하는 것이다.

---

## 1. 브랜치 구조

- main → 최종 제출용 (직접 작업 금지)
- dev → 통합 개발 브랜치
- 팀원 개별 브랜치 → 팀원 별 작업 브랜치 (PM, 팀원 모두 사용)

---

## 2. 기본 원칙

- 모든 작업은 dev를 기준으로 시작한다
- main에는 직접 push 금지
- 작업은 팀원 개별 브랜치에서 진행 후 dev에 반영한다
- PM은 공용 구조의 뼈대를 먼저 만든다
- 팀원은 자기 담당 기능(Task) 범위 안에서 작업한다

---

## 3. 작업 시작

작업 전 반드시 최신 코드 받기

git checkout dev
git pull origin dev

---

## 4. 작업 범위 규칙

### 팀원이 수정 가능한 영역

- 담당 pages/
- 담당 components/
- 담당 기능(Task)과 연결된 stores/ 내부 함수
- 담당 기능(Task)과 연결된 공용 파일의 자기 구역

예:

- RecordView.vue
- DashboardView.vue
- TransactionListView.vue
- transaction.js 내부의 자기 담당 함수

### PM 관리 영역

아래 파일은 PM이 기본 구조를 먼저 만든다:

- router/index.js
- stores/
- db.json
- App.vue
- 공통 컴포넌트

담당 범위 외 수정은 금지한다.

## 5. 작업 방법

### 기본 작업 (팀원 / PM 공통)

git checkout dev
git pull origin dev
git checkout -b (팀원 개별 브랜치)
git add .
git commit -m "feat: 기능 설명"
git push origin (팀원 개별 브랜치)

작업 완료 후 PM이 (팀원 개별 브렌치) → dev 로 merge 한다.

---

## 6. 커밋 규칙

형식:
타입: 작업 내용

타입 종류:

- feat → 기능 추가
- fix → 버그 수정
- refactor → 코드 정리
- docs → 문서 수정
- style → UI 수정

예:

- feat: 거래 등록 폼 추가
- fix: 필터 오류 수정

---

## 7. push 전 체크

- 프로젝트 실행 확인
- 에러 없는지 확인
- 기능 정상 동작 확인

---

## 8. 공용 파일 규칙

- 공용 파일은 자유 수정 금지
- PM이 먼저 파일 구조와 담당 구역을 나눈다
- 팀원은 자기 담당 Task 구역만 수정 가능하다
- 공용 파일 수정 시 반드시 팀원 개별 브랜치에서 작업한다

---

## 9. 충돌 방지

- 같은 파일을 여러 명이 수정할 수는 있지만, 담당 구역이 겹치지 않도록 나눈다
- 작업 전 dev 최신화 필수
- import, state, return 영역처럼 공통 줄은 동시에 수정하지 않도록 주의한다
- 충돌 발생 시 혼자 해결하지 말고 PM에게 공유한다

---

## 10. AI 코드 사용

- AI 코드 그대로 push 금지
- 반드시 확인 후 사용

추천 순서:

1. AI로 코드 생성
2. 읽고 수정
3. 실행 확인
4. 커밋

---

## 11. 최종 병합

- 개발 완료 후 dev 기준 전체 테스트
- 이상 없으면 PM이 dev → main 반영

---

## 12. 한 줄 요약

Git은 잘 쓰는 게 아니라 사고 안 나게 쓰는 게 중요하다
