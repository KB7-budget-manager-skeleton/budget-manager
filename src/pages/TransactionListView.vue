<template>
  <div class="transaction-page">
    <div class="transaction-container">
      <!-- head -->
      <h2 class="page-title">거래 내역 조회</h2>

      <div class="filter-row">
        <!-- 카테고리 드롭다운 -->
        <div class="select-row">
          <select
            class="category-select"
            :value="store.State.SelectedCategory"
            @change="store.SetSelectedCategory($event.target.value)"
          >
            <option value="all">전체</option>
            <option value="식비">식비</option>
            <option value="교통비">교통비</option>
            <option value="유흥">유흥</option>
            <option value="공과금">공과금</option>
            <option value="월급">월급</option>
            <option value="용돈">용돈</option>
            <option value="이자">이자</option>
          </select>

          <!-- 단위별 필터 버튼 -->
          <button class="filter-btn" @click="setWeek">이번 주</button>
          <button class="filter-btn" @click="setMonth">이번 달</button>
          <button class="filter-btn" @click="resetFilter">전체</button>
        </div>
      </div>

      <!-- 거래내역조회 -->
      <div class="table-wrap">
        <table class="transaction-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>항목</th>
              <th>금액</th>
              <th>메모</th>
              <th>작업</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="content in transactions" :key="content.id">
              <td>{{ content.date }}</td>
              <td>{{ content.category }}</td>
              <td>{{ content.item }}</td>
              <td>{{ content.amount }}원</td>
              <td>{{ content.memo }}</td>

              <td>
                <button class="action-btn edit-btn">수정</button>
                <button
                  class="action-btn delete-btn"
                  @click="deleteItem(content.id)"
                >
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const store = useTransactionStore();
const transactions = computed(() => store.FilterTransactionsByCategory);

// 컴포넌트 실행 시 데이터 가져오기
onMounted(() => {
  store.FetchTransactions();
});

// 기간별 필터
const setWeek = () => {
  store.SetSelectedPeriod('week');
};

const setMonth = () => {
  store.SetSelectedPeriod('month');
};

const resetFilter = () => {
  store.SetSelectedPeriod('all');
};

const deleteItem = (id) => {
  store.DeleteTransaction(id);
};
</script>

<style scoped>
.transaction-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #191b22 0%, #101117 100%);
  padding: 40px 20px;
  color: #ffffff;
}

.transaction-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px;
  background: rgba(13, 15, 24, 0.7);
  border-radius: 18px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.35);
}

.page-title {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #f8f9ff;
}

/* 상단 버튼 줄 */
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-btn {
  background: transparent;
  color: #f3f6ff;
  border: 2px solid #3f57ff;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 0 10px rgba(63, 87, 255, 0.2);
}

.filter-btn:hover {
  background: rgba(63, 87, 255, 0.14);
  box-shadow: 0 0 14px rgba(63, 87, 255, 0.35);
}

/* 드롭다운 */
.select-row {
  margin-bottom: 22px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
}

.category-select {
  width: 220px;
  background: rgba(35, 40, 82, 0.9);
  color: #ffffff;
  border: 2px solid #3f57ff;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  box-shadow: 0 0 10px rgba(63, 87, 255, 0.18);
}

.category-select:focus {
  border-color: #6f85ff;
  box-shadow: 0 0 12px rgba(111, 133, 255, 0.3);
}

/* 테이블 바깥 박스 */
.table-wrap {
  border: 2px solid #3f57ff;
  border-radius: 16px;
  padding: 20px;
  background: rgba(28, 33, 70, 0.32);
  box-shadow: 0 0 18px rgba(63, 87, 255, 0.18);
  overflow-x: auto;
}

/* 테이블 */
.transaction-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  color: #ffffff;
}

/* 테이블 헤더 */
.transaction-table thead tr {
  background: transparent;
}

.transaction-table th {
  font-size: 15px;
  font-weight: 600;
  color: #dbe2ff;
  padding: 12px 10px;
  text-align: center;
}

/* 테이블 본문 행 */
.transaction-table tbody tr {
  background: rgba(40, 46, 95, 0.88);
  box-shadow: 0 0 12px rgba(63, 87, 255, 0.16);
}

.transaction-table tbody td {
  padding: 18px 12px;
  text-align: center;
  color: #f8f9ff;
  border-top: 2px solid #3f57ff;
  border-bottom: 2px solid #3f57ff;
}

/* 각 줄 양 끝 둥글게 */
.transaction-table tbody td:first-child {
  border-left: 2px solid #3f57ff;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}

.transaction-table tbody td:last-child {
  border-right: 2px solid #3f57ff;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}

/* 작업 버튼 */
.action-btn {
  background: transparent;
  border: none;
  color: #eef2ff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0 4px;
  transition: 0.2s ease;
}

.edit-btn:hover {
  background-color: #ffc107; /* 노랑 */
  color: #000;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #dc3545; /* 빨강 */
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

/* 반응형 */
@media (max-width: 768px) {
  .transaction-container {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 26px;
  }

  .filter-row {
    justify-content: flex-start;
  }

  .category-select {
    width: 100%;
  }

  .transaction-table th,
  .transaction-table td {
    font-size: 13px;
    padding: 12px 8px;
  }
}
</style>
