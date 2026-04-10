<template>
  <header class="Header">
    <!-- 좌측: 로고 -->
    <router-link to="/" class="Logo">모니메이트</router-link>

    <!-- 가운데: 메뉴 (데스크탑) -->
    <nav class="NavWrapper">
      <router-link to="/">대시보드</router-link>
      <router-link to="/record">거래 등록</router-link>
      <router-link to="/transactions">거래 내역</router-link>
      <router-link to="/budget">예산 관리</router-link>
    </nav>

    <!-- 우측: 햄버거 버튼 (모바일) -->
    <button
      class="Hamburger"
      @click="menuOpen = !menuOpen"
      aria-label="메뉴 열기"
    >
      {{ menuOpen ? '✕' : '☰' }}
    </button>

    <!-- 모바일 드롭다운 -->
    <nav v-if="menuOpen" class="MobileNav">
      <router-link to="/" @click="menuOpen = false">대시보드</router-link>
      <router-link to="/record" @click="menuOpen = false"
        >거래 등록</router-link
      >
      <router-link to="/transactions" @click="menuOpen = false"
        >거래 내역</router-link
      >
      <router-link to="/budget" @click="menuOpen = false"
        >예산 관리</router-link
      >
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const menuOpen = ref(false);
</script>

<style scoped>
.Header {
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #1a1a1b;
  border-bottom: 1px solid #3d3d4a;
  padding: 0 40px;
  position: relative;
}

/* 로고 */
.Logo {
  text-decoration: none;
  color: #ffffff;
  font-family: 'PyeongchangPeace', sans-serif;
  font-weight: 700;
  font-size: 28px;
}

/* 데스크탑 네비게이션 */
.NavWrapper {
  display: flex;
  gap: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.NavWrapper a,
.NavWrapper a:visited {
  text-decoration: none;
  color: #9193a6;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
}

.NavWrapper a:hover,
.NavWrapper a.router-link-active {
  color: #4659ff;
}

/* 햄버거 버튼 (기본 숨김) */
.Hamburger {
  display: none;
  margin-left: auto;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
}

/* 모바일 드롭다운 */
.MobileNav {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background-color: #3d3d4a;
  padding: 16px 24px;
  gap: 16px;
  z-index: 100;
}

.MobileNav a,
.MobileNav a:visited {
  text-decoration: none;
  color: #9193a6;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
}

.MobileNav a:hover,
.MobileNav a.router-link-active {
  color: #4659ff;
}

/* 반응형 */
@media (max-width: 768px) {
  .Header {
    padding: 0 20px;
  }

  .NavWrapper {
    display: none;
  }

  .Hamburger {
    display: block;
  }
}
</style>
