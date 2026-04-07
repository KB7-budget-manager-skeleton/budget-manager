# CODE CONVENTION

이 문서는 팀 전체 코드 스타일을 맞추기 위한 최소 규칙이다.  
목표는 “잘 짜는 코드”가 아니라 **같이 보기 쉬운 코드**다.

---

## 1. 기본 원칙

- 쉬운 코드가 좋은 코드다
- 한 파일 = 한 역할
- 같은 의미는 같은 이름 사용
- 중복되면 컴포넌트로 분리

---

## 2. 폴더 규칙

- pages/ → 페이지
- components/ → 재사용 UI
- stores/ → Pinia
- router/ → 라우팅

---

## 3. Vue 작성 규칙

- `<script setup>` 사용
- Composition API 사용

---

## 4. 파일명 규칙

- 컴포넌트: PascalCase
- 페이지: PascalCase

예:

- TransactionForm.vue
- DashboardView.vue

---

## 5. 변수명 규칙

- PascalCase 사용
- 의미 있는 이름 사용

좋은 예:

- TransActions
- SelectedCategory
- MonthlySummary
- IsLoading

나쁜 예:

- data
- temp
- a, b

---

## 6. boolean 네이밍

- is 사용

예:

- IsLoading
- IsEditMode
- IsError

---

## 7. 함수 규칙

- 동사로 시작

예:

- FetchTransactions
- CreateTransaction
- UpdateTransaction
- DeleteTransaction

---

## 8. 데이터 규칙 (가계부 기준)

거래 데이터 구조:

{
id: "1",
date: "2026-04-07",
type: "expense",
category: "식비",
amount: 10000,
memo: "점심"
}

네이밍 규칙:

- 목록: transactions
- 단일: transaction

---

## 9. API 규칙

- GET → 조회
- POST → 생성
- PUT → 수정
- DELETE → 삭제

---

## 10. axios 규칙

- 수정: axios.put
- 삭제: axios.delete
- try/catch 사용

---

## 11. 컴포넌트 규칙

- 데이터 관리와 로직은 Pinia(store)에서 처리한다
- 컴포넌트는 UI(화면 표시) 역할에 집중한다

---

### 📌 Pinia 사용 (기본)

다음 데이터는 반드시 store에서 관리한다:

- 거래 목록 (transactions)
- API 호출 (조회, 생성, 수정, 삭제)
- 필터 상태
- 월별 요약 데이터

👉 모든 컴포넌트는 store를 통해 데이터에 접근한다

---

### 📌 props / emit 사용 기준

다음 경우에만 사용한다:

- 부모 → 자식 단순 데이터 전달 (UI용)
- 버튼 클릭, 이벤트 전달 등 간단한 상호작용

예:

- props: transaction
- emit: delete, submit

---

## ✔ 한 줄 요약

👉 데이터는 Pinia, UI는 컴포넌트

---

## 12. Pinia 규칙

- 공용 데이터는 store에서 관리
- store 이름은 기능 기준

예:

- useTransactionStore

---

## 13. 주석 규칙

- 주석은 “왜 필요한지 + 어떤 작업(Task)”을 함께 작성한다
- 너무 길게 쓰지 말고 한 줄로 간단하게 작성한다
- 필요할 때만 작성한다 (모든 코드에 달지 않기)

---

### Task 기반 주석 규칙

각 기능은 아래처럼 번호를 기준으로 구분한다.

1. 수입/지출 기록
2. 거래 내역 조회
3. 월별 재정 요약
4. 기존 거래 수정

각 기능 내부 작업(Task)은 다음처럼 표기한다:

👉 `[기능번호-작업번호] 작업 내용`

---

### 📌 주석 작성 예시

```js
// [1-1] 수입/지출 데이터 저장 API 호출
const CreateTransaction = async () => {};

// [1-2] 거래내역 등록용 입력 폼(form) 상태 관리
const FormData = reactive({});

// [2-1] 거래 목록 조회 및 필터 적용
const FetchTransactions = async () => {};

// [2-2] 카테고리 필터 처리 로직
const FilterTransactions = () => {};

// [3-1] 월별 수입/지출 합계 계산
const CalculateMonthlySummary = () => {};

// [4-1] 기존 거래 데이터 불러오기
const FetchTransactionById = async () => {};
```
