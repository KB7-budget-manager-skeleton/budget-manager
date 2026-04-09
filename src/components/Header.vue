<template>
  <header class="Header">
    <!-- 좌측: 사이트명 -->
    <router-link to="/" class="Logo"> 모니메이트 </router-link>

    <!-- 가운데: 메뉴 -->
    <div class="NavWrapper">
      <router-link to="/">대시보드</router-link>
      <router-link to="/record">거래 등록</router-link>
      <router-link to="/transactions">거래 내역</router-link>
      <!-- 추가 기능: 예산관리 페이지(담당:수현) -->
      <router-link to="/budget">예산 관리</router-link>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.Header {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
  position: relative; /* 가운데 정렬용 */
}

/* 좌측 로고 */
.Logo {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

/* 가운데 메뉴 */
.NavWrapper {
  display: flex;
  gap: 30px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 정확히 가운데 */
}
</style>
