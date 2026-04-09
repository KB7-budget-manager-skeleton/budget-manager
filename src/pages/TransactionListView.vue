<template>
  <div class="container mt-4">
    <!-- head -->
    <h2 class="mb-4">거래 내역 조회</h2>

    <!-- 단위별 필터 버튼  -->
    <div class="mb-3">
      <button class="btn btn-outline-primary me-2" @click="setWeek">
        이번 주
      </button>
      <button class="btn btn-outline-success me-2" @click="setMonth">
        이번 달
      </button>
      <button class="btn btn-outline-secondary" @click="resetFilter">
        전체
      </button>
      <hr />
    </div>
    <!-- 카테고리 필터 -->
    <div class="mb-3">
      <button class="btn btn-outline-dark me-2" @click="setCategory('all')">
        전체 카테고리
      </button>
      <button class="btn btn-outline-danger me-2" @click="setCategory('식비')">
        식비
      </button>
      <button class="btn btn-outline-warning me-2" @click="setCategory('교통')">
        교통
      </button>
      <button class="btn btn-outline-info me-2" @click="setCategory('쇼핑')">
        쇼핑
      </button>
      <button class="btn btn-outline-success me-2" @click="setCategory('월급')">
        월급
      </button>
    </div>
    <!-- 들어가는 내용  -->
    <table class="table table-striped table-hover text-center">
      <thead class="table-primary">
        <tr>
          <th>날짜</th>
          <th>카테고리</th>
          <th>금액</th>
          <th>메모</th>
          <th>작업</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount }}원</td>
          <td>{{ item.memo }}</td>

          <!-- 작업(수정/ 삭제 ) 버튼 구현 -->
          <td>
            <button class="btn btn-sm btn-outline-warning me-2">수정</button>
            <button class="btn btn-sm btn-outline-danger">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const store = useTransactionStore();

// store → 화면 연결

const transactions = computed(() => store.FilterTransactionsByPeriod());

// 컴포넌트 실행 시 데이터 가져오기
onMounted(() => {
  store.FetchTransactions();
});
const setWeek = () => {
  store.SetSelectedPeriod('week');
};

const setMonth = () => {
  store.SetSelectedPeriod('month');
};

const resetFilter = () => {
  store.SetSelectedPeriod('all');
};
</script>
