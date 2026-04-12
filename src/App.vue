<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Main Contents -->
    <main>
      <router-view />
    </main>

    <!-- Footer 그냥 추가...ㅎ 컴포넌트로 만들 정도의 내용이 없음 -->
    <footer class="Footer">
      <p class="FooterTitle">모니메이트</p>
      <p class="FooterText">KB IT's Your Life Skeleton Project</p>
      <p class="FooterCopyright">© 2026 MoneyMate. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style>
/* Pretendard */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css");

/* PyeongchangPeace (로고용) */
@font-face {
  font-family: "PyeongchangPeace";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2")
    format("woff2");
  font-weight: 700;
  font-display: swap;
}

:root {
  /* bootstrap 속성 덮어쓰기 */
  --bs-body-font-family:
    "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, "Noto Sans KR", sans-serif;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
}

body {
  background-color: #1a1a1b;
}
</style>

<style scoped>
.AppLayout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
}

.Footer {
  border-top: 1px solid #3d3d4a;
  background-color: #1a1a1b;
  padding: 24px 20px 28px;
  text-align: center;
}

.FooterTitle {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
}

.FooterText {
  margin: 0 0 6px;
  color: #9193a6;
  font-size: 14px;
}

.FooterCopyright {
  margin: 0;
  color: #6f7185;
  font-size: 13px;
}
</style>
