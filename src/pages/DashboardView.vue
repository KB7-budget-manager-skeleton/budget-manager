<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-content">
      <h2>대시보드</h2>

      <div class="header-section">
        <h4 class="sub-title">dashboard</h4>

        <h2 class="main-title">한눈에 모든 정보를 확인해보세요</h2>

        <hr class="divider" />
      </div>

      <div class="cards-container">
        <div v-for="(card, index) in SummaryCards" :key="index" class="summary-card">
          <h3 class="card-title">{{ card.title }}</h3>
          <div class="card-bottom">
            <p class="card-amount">{{ card.amount.toLocaleString() }}원</p>
            
            <span class="card-compare">
              지난달보다 
              <span :class="card.isIncrease ? 'text-red' : 'text-blue'">
                {{ card.rate }}%
              </span>
              {{ card.isIncrease ? '늘었어요.' : '줄었어요.' }}
            </span>
            
          </div>
        </div>
      </div>

      <div class="button-container">
        <button class="detail-btn" @click="GoToDetails">자세히 보기</button>
      </div>

      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 라우터 
const router = useRouter();

// 요구 명세의 3-2 데이터 계산이 완료되지 않아 dummy data 삽입
// 색상 처리를 위해 compareText 대신 rate와 isIncrease로 데이터를 변경했습니다.
const SummaryCards = ref([
  {
    title: '수입',
    amount: 3500000,
    rate: 10,
    isIncrease: true,
  },
  {
    title: '지출',
    amount: 1250000,
    rate: 5,
    isIncrease: false,
  },
  {
    title: '순이익',
    amount: 2250000, // 350만 - 125만
    rate: 15,
    isIncrease: true,
  },
]);

// 자세히 보기를 눌렀을 때의 이동을 담당하는 함수
const GoToDetails = () => {
  router.push('/transactions');
};
</script>

<style scoped>
/* ------------------- 레이아웃 및 배경 ------------------- */
.dashboard-wrapper {
  background-color: #1e1e20; /* 피그마 배경색 */
  width: 100%;
  min-height: 100vh; /* 화면 밑바닥까지 배경색 꽉 채우기 */
  padding: 60px 20px;
  box-sizing: border-box;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  margin: 0;
}

.dashboard-content {
  max-width: 900px;
  margin: 0 auto;
}

/* ------------------- 제목 영역 ------------------- */
.header-section {
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-title {
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 12px;
  font-weight: 800;
  letter-spacing: 1px;
}

.main-title {
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 0;
}

hr.divider {
  width: 320px; 
  height: 1px;
  background-color: #3f3f46;
  border: none;
  margin: 0;
}

/* ------------------- 요약 카드 영역 ------------------- */
.cards-container {
  display: flex;
  gap: 20px; 
  margin-bottom: 16px; 
}

.summary-card {
  flex: 1; 
  background-color: #363640; 
  padding: 32px 24px; 
  border-radius: 16px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  min-height: 140px; 
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-align: left; 
}

.card-bottom {
  margin-top: auto; 
}

.card-amount {
  font-size: 32px; 
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0; 
  text-align: center; /* ✅ 가운데 정렬로 수정됨 */
}

.card-compare {
  font-size: 14px;
  color: #a1a1aa; 
  text-align: center; /* ✅ 가운데 정렬로 수정됨 */
  display: block;
}

/* --- 증감률 색상 클래스 --- */
.text-red {
  color: #ff6b6b; /* 증가 부분 붉은 계열 */
  font-weight: 700;
}

.text-blue {
  color: #4facfe; /* 감소 부분 푸른 계열 */
  font-weight: 700;
}

/* ------------------- 버튼 영역 ------------------- */
.button-container {
  width: 100%;
}

.detail-btn {
  width: 100%; 
  background-color: #5b54fa; 
  color: #ffffff;
  border: none;
  border-radius: 12px; 
  padding: 18px 0; 
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.detail-btn:hover {
  background-color: #463ee6; 
}
</style>