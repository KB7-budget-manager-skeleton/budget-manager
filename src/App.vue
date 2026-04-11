<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Main Contents -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style>
/* Pretendard */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css');

/* PyeongchangPeace (로고용) */
@font-face {
  font-family: 'PyeongchangPeace';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-display: swap;
}

:root {
  /* bootstrap 속성 덮어쓰기 */
  --bs-body-font-family:
    'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, 'Noto Sans KR', sans-serif;
}

body {
  background-color: #1a1a1b;
}
</style>

<style scoped>
main {
  padding: 20px;
}
</style>
