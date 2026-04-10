<template>
  <div class="page">
    <p class="page-label">apply</p>
    <h2 class="page-title">오늘의 모니기록을 잊지 마세요!</h2>
    <hr class="page-divider" />

    <!-- 수입 / 지출 요약 카드 -->
    <div class="cards-wrapper">
      <div class="summary-card card-income" @click="openModal('income')">
        <p class="card-type">수입</p>
        <p class="card-count-label">총 기록 횟수</p>
        <p class="card-count">{{ incomeSummary.count }}건</p>
        <p class="card-date">
          최근 일시&nbsp;{{
            incomeSummary.latestDate
              ? formatDate(incomeSummary.latestDate)
              : '—'
          }}
        </p>
      </div>

      <div class="summary-card card-expense" @click="openModal('expense')">
        <p class="card-type">지출</p>
        <p class="card-count-label">총 기록 횟수</p>
        <p class="card-count">{{ expenseSummary.count }}건</p>
        <p class="card-date">
          최근 일시&nbsp;{{
            expenseSummary.latestDate
              ? formatDate(expenseSummary.latestDate)
              : '—'
          }}
        </p>
      </div>
    </div>

    <!-- 거래 입력 모달 -->
    <TransactionForm
      :show="showModal"
      :type="activeType"
      @submit="handleSubmit"
      @cancel="
        () => {
          showModal = false;
        }
      "
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transaction';
import TransactionForm from '@/components/TransactionForm.vue';

const store = useTransactionStore();
const router = useRouter();

// ── 초기 데이터 로드 ─────────────────────────────────────────────
onMounted(() => {
  store.FetchTransactions();
});

// ── 모달 제어 ────────────────────────────────────────────────────
const showModal = ref(false);
const activeType = ref('expense'); // 카드 클릭으로 결정되는 수입/지출 구분

// 카드 클릭 시 type 설정 후 모달 열기
const openModal = (type) => {
  activeType.value = type;
  showModal.value = true;
};

// ── 수입 / 지출 요약 ─────────────────────────────────────────────

// 수입 건수와 가장 최근 날짜
const incomeSummary = computed(() => {
  const records = store.State.Transactions.filter((t) => t.type === 'income');
  const latestDate = records.length
    ? records.reduce((max, t) => (t.date > max ? t.date : max), records[0].date)
    : null;
  return { count: records.length, latestDate };
});

// 지출 건수와 가장 최근 날짜
const expenseSummary = computed(() => {
  const records = store.State.Transactions.filter((t) => t.type === 'expense');
  const latestDate = records.length
    ? records.reduce((max, t) => (t.date > max ? t.date : max), records[0].date)
    : null;
  return { count: records.length, latestDate };
});

// "2026-04-10" → "2026.04.10" 형식 변환
const formatDate = (dateStr) => dateStr.replace(/-/g, '.');

// ── 거래 저장 ────────────────────────────────────────────────────
// TransactionForm에서 emit('submit', formData)로 받은 데이터를 API에 전송
// 품목이 여러 개일 경우 건별로 분리하여 각각 POST
const handleSubmit = async (formData) => {
  for (const row of formData.items) {
    await store.CreateTransaction({
      date: formData.date,
      type: formData.type,
      location: formData.location,
      category: formData.category,
      item: row.item,
      amount: row.amount,
      memo: row.memo,
    });
  }
  router.push({ name: 'TransactionListView' });
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}

.page-label {
  font-family: 'PyeongchangPeace', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px;
  letter-spacing: 0.05em;
}

.page-title {
  font-size: 36px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 24px;
}

.page-divider {
  width: 100%;
  border: none;
  border-top: 1px solid #3d3d4a;
  margin: 0 0 40px;
}

.cards-wrapper {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 720px;
}

.summary-card {
  flex: 1;
  border-radius: 16px;
  padding: 32px 28px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-income {
  background: #4659ff;
}
.card-expense {
  background: #3d3d4a;
}

.card-type {
  font-size: 40px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.card-count-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

/* 숫자에 그라디언트 효과 적용 */
.card-count {
  font-size: 60px;
  font-weight: 700;
  margin: 8px 0;
  line-height: 1;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.35) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-date {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}
</style>
