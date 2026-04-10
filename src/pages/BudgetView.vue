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
        <div>오늘까지 권장 지출 000,000원</div>
        <div>
          <!-- 막대그래프 구현 예정 -->
        </div>
        <div>총 예산 {{ DummyTotalBudget.toLocaleString() }}원</div>
      </section>

      <section>
        <article>
          <p>이번달 <br />이만큼을 사용했어요</p>
          <p>{{ DummyCurrentMonthSpend.toLocaleString() }}원</p>
        </article>

        <article>
          <p>이번달 <br />하루에 이만큼을 쓸 수 있어요</p>
          <p>{{ DailyAllowance.toLocaleString() }}원</p>
        </article>
      </section>

      <div>
        <button type="button" @click="OpenModal">예산 수정하러 가기</button>
      </div>
    </div>

    <div v-if="isModalOpen">
      <button type="button" @click="CloseModal">X</button>

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
          <p v-if="isShowError">예산을 입력해주세요.</p>
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

        <div>
          <button type="submit">저장하기</button>
          <button type="button" @click="CloseModal">취소하기</button>
        </div>
      </form>
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

// 모달창 인풋에 보여질 텍스트 
const FormattedInput = computed(() => {
  if (InputAmount.value === 0) return '';
  return InputAmount.value.toLocaleString() + '원';
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

// 5. 저장하기 버튼 눌렀을 때
const SaveBudget = () => {
  // 예산을 안 적었으면 에러 띄우기(숫자만 입력 가능) -구현 필요 (현재 오류 시 모달창 닫힘)
  if (
    !InputAmount.value ||
    InputAmount.value <= 0 ||
    isNaN(InputAmount.value)
  ) {
    isShowError.value = true;
    return;
  }
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

  isShowError.value = false;
  DummyTotalBudget.value = InputAmount.value; // 더미 변수에 저장
  isBudgetSet.value = true; // 대시보드 화면 켜기
};
isModalOpen.value = false; // 모달 닫기
</script>
