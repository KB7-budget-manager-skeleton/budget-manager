<template>
  <main class="app-container">
    <div class="content-wrapper">
      <div v-if="isBudgetSet" class="dashboard">
        <header class="header-section">
          <h3 class="month-title">{{ CurrentMonth }}월</h3>
          <h2 class="budget-title">
            예산이 <br />
            <strong class="highlight-text"
              >{{ RemainingBudget.toLocaleString() }}원</strong
            >
            남았어요
          </h2>
        </header>

        <section class="progress-section">
          <div class="info-text">
            오늘까지 권장 지출 {{ RecommendedSpendToDate.toLocaleString() }}원
          </div>

          <div class="progress-bar-container">
            <div
              :style="{ width: ProgressPercent + '%' }"
              class="progress-fill"
            ></div>

            <div
              :style="{ left: RecommendedPercent + '%' }"
              class="target-marker-wrapper"
            >
              <span class="target-text">오늘 권장 목표</span>
              <div class="target-line"></div>
            </div>
          </div>

          <div class="info-text total-text">
            총 예산 {{ DummyTotalBudget.toLocaleString() }}원
          </div>
        </section>

        <section class="summary-section">
          <article class="summary-card">
            <p class="summary-label">이번달 이만큼을 사용했어요</p>
            <p class="summary-value">
              {{ DummyCurrentMonthSpend.toLocaleString() }}원
            </p>
          </article>

          <article class="summary-card">
            <p class="summary-label">이번달 하루에 이만큼을 쓸 수 있어요</p>
            <p class="summary-value">{{ DailyAllowance.toLocaleString() }}원</p>
          </article>
        </section>

        <div class="button-container">
          <button type="button" class="primary-btn" @click="OpenModal">
            예산 수정하러 가기
          </button>
        </div>
      </div>

      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <button type="button" @click="CloseModal" class="close-btn">X</button>

          <header class="modal-header">
            <h2>예산을 설정해주세요</h2>
          </header>

          <form @submit.prevent="SaveBudget" class="modal-form">
            <div class="input-group">
              <label for="budget">예산</label>
              <input
                type="text"
                id="budget"
                ref="BudgetInputRef"
                placeholder="0원"
                :value="FormattedInput"
                @input="HandleInput"
                autocomplete="off"
                inputmode="numeric"
                @keydown="PreventText"
                class="budget-input"
              />
              <p v-if="isShowError" class="error-text">
                예산을 올바르게 입력해주세요.
              </p>
            </div>

            <hr class="divider" />

            <div class="readonly-group">
              <div class="readonly-row">
                <p>지난달 지출</p>
                <p class="readonly-value">
                  {{ DummyLastMonthSpend.toLocaleString() }}원
                </p>
              </div>
              <div class="readonly-row">
                <p>이번달 지출</p>
                <p class="readonly-value">
                  {{ DummyCurrentMonthSpend.toLocaleString() }}원
                </p>
              </div>
              <div class="readonly-row">
                <p>권장 예산</p>
                <p class="readonly-value">000,000원</p>
              </div>
            </div>

            <div class="btn-group">
              <button type="button" class="cancel-btn" @click="CloseModal">
                취소하기
              </button>
              <button type="submit" class="submit-btn">저장하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// 임의의 더미데이터 설정
const DummyTotalBudget = ref(0); // 총 예산 (초기값 0)
const DummyLastMonthSpend = ref(950000); // 지난달 지출
const DummyCurrentMonthSpend = ref(420000); // 이번달 지출

// 그 외 변수
const isBudgetSet = ref(false); // 예산이 설정되었는지 여부
const isModalOpen = ref(false); // 모달창 열림/닫힘
const CurrentMonth = ref(new Date().getMonth() + 1); // 현재 월

const InputAmount = ref(0); // 사용자가 입력하는 숫자
const isShowError = ref(false); // 에러 메시지 표시 여부

// 모달 인풋에 포커스를 주기 위한 참조 변수
const BudgetInputRef = ref(null);

// Computed - 남은 예산
const RemainingBudget = computed(() => {
  return DummyTotalBudget.value - DummyCurrentMonthSpend.value;
  // 남은 예산 = 총 예산 - 이번달 지출
});

// Computed - 하루 권장 지출액
const DailyAllowance = computed(() => {
  const Today = new Date();
  const LastDay = new Date(
    Today.getFullYear(),
    Today.getMonth() + 1,
    0,
  ).getDate();
  const RemainingDays = LastDay - Today.getDate() + 1;

  if (RemainingDays <= 0 || RemainingBudget.value <= 0) return 0;

  return Math.floor(RemainingBudget.value / RemainingDays);
});

// 오늘까지 권장 지출액
const RecommendedSpendToDate = computed(() => {
  if (DummyTotalBudget.value === 0) return 0;

  const Today = new Date();
  const CurrentDay = Today.getDate(); // 오늘 날짜
  const LastDay = new Date(
    Today.getFullYear(),
    Today.getMonth() + 1,
    0,
  ).getDate(); // 이번 달의 마지막 날짜

  // (총 예산 / 이번 달 총 일수) * 오늘 날짜
  const IdealDailySpend = DummyTotalBudget.value / LastDay;
  return Math.floor(IdealDailySpend * CurrentDay);
});

// 모달창 인풋에 보여질 텍스트
const FormattedInput = computed(() => {
  if (InputAmount.value === 0) return '';
  return InputAmount.value.toLocaleString() + '원';
});

// 막대그래프 진행률 계산
const ProgressPercent = computed(() => {
  if (DummyTotalBudget.value === 0) return 0;
  // 지출 비율 계산 (최대 100%를 넘지 않도록 처리)
  const Ratio = (DummyCurrentMonthSpend.value / DummyTotalBudget.value) * 100;
  return Math.min(Ratio, 100);
});

// 하얀 선의 위치(퍼센트) 계산
const RecommendedPercent = computed(() => {
  if (DummyTotalBudget.value === 0) return 0;
  const Ratio = (RecommendedSpendToDate.value / DummyTotalBudget.value) * 100;
  return Math.min(Ratio, 100);
});

// 화면 켜질 때 실행: 예산이 0원이면 바로 모달 열기
onMounted(async () => {
  if (DummyTotalBudget.value === 0) {
    isModalOpen.value = true;

    // 모달 인풋창에 포커스
    await nextTick();
    if (BudgetInputRef.value) {
      BudgetInputRef.value.focus();
    }
  } else {
    isBudgetSet.value = true;
  }
});

// ESC 모달 닫기
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') CloseModal();
  });
});

// 입력창에 숫자 칠 때 실행: 숫자만 남기고, 콤마 찍을 준비
const HandleInput = (event) => {
  const RawValue = event.target.value.replace(/[^0-9]/g, '');
  InputAmount.value = RawValue === '' ? 0 : Number(RawValue);
};

// 수정하러 가기 버튼 누르면 모달창 열기
const OpenModal = async () => {
  InputAmount.value = DummyTotalBudget.value; // 기존 예산을 입력창에 채워줌
  isShowError.value = false;
  isModalOpen.value = true;

  // 모달이 열리고 인풋창에 포커스
  await nextTick();
  if (BudgetInputRef.value) {
    BudgetInputRef.value.focus();
  }
};

// 모달창 닫기 (X 버튼, 취소 버튼)
const CloseModal = () => {
  isModalOpen.value = false;
};

// 숫자 외의 다른 키를 입력 방지하는 함수
const PreventText = (event) => {
  // 허용키 설정
  const AllowedKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];
  if (AllowedKeys.includes(event.key)) return;

  if (
    (event.ctrlKey || event.metaKey) &&
    ['a', 'c', 'v'].includes(event.key.toLowerCase())
  )
    return;

  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
};

// 5. 저장하기 버튼 눌렀을 때
const SaveBudget = () => {
  // 예산을 안 적었으면 에러 띄우기(숫자만 입력 가능)
  if (
    !InputAmount.value ||
    InputAmount.value <= 0 ||
    isNaN(InputAmount.value)
  ) {
    isShowError.value = true;
    return;
  }

  isShowError.value = false;
  DummyTotalBudget.value = InputAmount.value; // 더미 변수에 저장
  isBudgetSet.value = true; // 대시보드 화면 켜기
  isModalOpen.value = false; // 모달 닫기
};
</script>

<style scoped>
/* 전역 레이아웃 (오른쪽 메인 대시보드 완벽 일치) */
.app-container {
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #212123;
  color: #ffffff;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  box-sizing: border-box;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    sans-serif;
}

.content-wrapper {
  width: 100%;
  max-width: 900px;
}

/* 대시보드 헤더 영역 */
.header-section {
  text-align: center;
  margin-bottom: 50px;
}
.month-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}
.budget-title {
  font-size: 2.2rem;
  line-height: 1.4;
  margin: 0;
  font-weight: 800;
}
.highlight-text {
  color: #635bff;
}

/* 막대그래프 영역 */
.progress-section {
  margin-bottom: 50px;
}
.progress-bar-container {
  position: relative;
  width: 100%;
  height: 18px;
  background-color: #333336;
  border-radius: 9px;
  margin: 45px 0 10px 0;
}
.progress-fill {
  height: 100%;
  background-color: #635bff;
  border-radius: 9px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.target-marker-wrapper {
  position: absolute;
  top: -32px;
  bottom: -6px;
  width: 2px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}
.target-text {
  background-color: #ffffff;
  color: #000000;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  margin-bottom: 6px;
}
.target-line {
  width: 2px;
  flex-grow: 1;
  background-color: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}

.info-text {
  font-size: 0.95rem;
  color: #aaaaaa;
  font-weight: 500;
}
.total-text {
  text-align: right;
}

/* 카드 영역 (오른쪽 대시보드 카드 완벽 재현) */
.summary-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
.summary-card {
  flex: 1;
  background-color: #333336;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.summary-label {
  align-self: flex-start;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 20px 0;
}
.summary-value {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

/* 하단 버튼 */
.button-container {
  text-align: center;
}
.primary-btn {
  width: 100%;
  padding: 18px;
  background-color: #635bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
.primary-btn:hover {
  opacity: 0.9;
}

/* 모달 영역 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: #212123; /* 모달도 전체 톤에 맞춤 */
  color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888888;
  cursor: pointer;
}
.modal-header {
  margin-bottom: 24px;
}
.modal-header h5 {
  color: #aaaaaa;
  margin: 0 0 5px 0;
  font-size: 1rem;
}
.modal-header h2 {
  margin: 0;
  font-size: 1.6rem;
  color: #ffffff;
}

/* 입력 폼 */
.input-group {
  margin-bottom: 24px;
}
.input-group label {
  display: block;
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 10px;
}
.budget-input {
  width: 100%;
  padding: 12px 0;
  font-size: 1.8rem;
  font-weight: bold;
  background-color: transparent;
  color: #ffffff;
  border: none;
  border-bottom: 2px solid #555555;
  text-align: center;
  outline: none;
  transition: border-color 0.2s;
}
.budget-input:focus {
  border-bottom-color: #635bff;
}
.error-text {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
}
.divider {
  border: none;
  border-top: 1px solid #444444;
  margin: 24px 0;
}

/* 읽기 전용 데이터 */
.readonly-group {
  margin-bottom: 30px;
}
.readonly-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 1rem;
  color: #aaaaaa;
}
.readonly-row p {
  margin: 0;
}
.readonly-value {
  font-weight: bold;
  color: #ffffff;
}

/* 모달 버튼 그룹 */
.btn-group {
  display: flex;
  gap: 12px;
}
.btn-group button {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
}
.cancel-btn {
  background-color: #333336;
  color: #ffffff;
}
.submit-btn {
  background-color: #635bff;
  color: white;
}
</style>
