<template>
  <main>
    <div v-if="isBudgetSet">
      <header>
        <h3>{{ CurrentMonth }}월</h3>
        <h2>
          예산이 <br />
          <strong>{{ RemainingBudget.toLocaleString() }}원</strong> 남았어요
        </h2>
      </header>

      <section>
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
            <span class="target-text">오늘까지 권장 지출 </span>
            <div class="target-line"></div>
          </div>
        </div>

        <div class="info-text total-text">
          총 예산 {{ DummyTotalBudget.toLocaleString() }}원
        </div>
      </section>

      <section>
        <article>
          <p>이번달 <br />이만큼을 사용했어요</p>
          <p class="center-align">
            {{ DummyCurrentMonthSpend.toLocaleString() }}원
          </p>
        </article>

        <article>
          <p>이번달 <br />하루에 이만큼을 쓸 수 있어요</p>
          <p class="center-align">{{ DailyAllowance.toLocaleString() }}원</p>
        </article>
      </section>

      <div>
        <button type="button" @click="OpenModal">예산 수정하러 가기</button>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <button type="button" @click="CloseModal" class="close-btn">X</button>

        <header>
          <h5>Input</h5>
          <h2>예산을 설정해주세요</h2>
        </header>

        <form @submit.prevent="SaveBudget">
          <div>
            <label for="budget">예산</label>
            <input
              type="text"
              id="budget"
              placeholder="0원"
              :value="FormattedInput"
              @input="HandleInput"
              autocomplete="off"
              inputmode="numeric"
              @keydown="PreventText"
            />
            <p v-if="isShowError" class="error-text">
              예산을 올바르게 입력해주세요.
            </p>
          </div>

          <hr />

          <div>
            <p>지난달 지출</p>
            <p>{{ DummyLastMonthSpend.toLocaleString() }}원</p>
          </div>
          <div>
            <p>이번달 지출</p>
            <p>{{ DummyCurrentMonthSpend.toLocaleString() }}원</p>
          </div>
          <div>
            <p>권장 예산</p>
            <p>000,000원</p>
          </div>

          <div class="btn-group">
            <button type="submit">저장하기</button>
            <button type="button" @click="CloseModal">취소하기</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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
onMounted(() => {
  if (DummyTotalBudget.value === 0) {
    isModalOpen.value = true;
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
const OpenModal = () => {
  InputAmount.value = DummyTotalBudget.value; // 기존 예산을 입력창에 채워줌
  isShowError.value = false;
  isModalOpen.value = true;
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
/* 화면 전반을 가리는 팝업 형태 디자인 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 팝업 중앙의 하얀 박스 */
.modal-content {
  background-color: #ffffff;
  color: #000000;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 우측 상단 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #666;
}

/* 에러 메시지 스타일 */
.error-text {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 5px;
}

/* 막대그래프 디자인 */

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  margin: 35px 0 15px 0; /* ⭐ 위쪽 여백(35px)을 충분히 주어 글씨가 들어갈 공간 확보 */
}

/* 실제 지출 막대 */
.progress-fill {
  height: 100%;
  background-color: #4f46e5;
  border-radius: 10px;
  transition: width 0.4s ease-in-out;
}

/* 오늘 권장 목표 하얀 선과 글씨를 담는 래퍼 */
.target-marker-wrapper {
  position: absolute;
  top: -8px; /* 막대 위로 삐져나오게 */
  bottom: -8px; /* 막대 아래로 삐져나오게 */
  width: 2px;
  transform: translateX(
    -50%
  ); /* 정확한 퍼센트 지점에 선의 중앙이 오도록 정렬 */
  z-index: 10;
}

/* 하얀 선 본체 */
.target-line {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5); /* 선이 묻히지 않게 그림자 추가 */
}

/* 하얀 선*/
.target-text {
  position: absolute;
  top: -24px; /* 하얀 선 꼭대기보다 더 위로 올림 */
  left: 50%;
  transform: translateX(-50%); /* 텍스트가 선의 중앙에 오도록 정렬 */
  font-size: 0.75rem;
  font-weight: bold;
  color: #ffffff; /* 글씨 색상 (어두운 테마면 유지, 밝은 테마면 #333 등 변경) */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  background-color: rgba(0, 0, 0, 0.6); /* 글씨가 잘 보이도록 작은 배경 추가 */
  padding: 2px 6px;
  border-radius: 4px;
}

/* 그래프 위아래 정보 텍스트 */
.info-text {
  font-size: 0.9rem;
  color: #555;
}
.total-text {
  text-align: right;
}

/* 텍스트 가운데 정렬 */
.center-align {
  text-align: center;
}

/* 버튼 그룹 정렬 */
.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-group button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
}
</style>
