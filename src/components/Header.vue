<template>
  <header class="Header">
    <div class="TitleArea">
      <h1 class="ProjectTitle">Budget Manager</h1>
      <p class="ProjectSubtitle">KB Skeleton Project</p>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.Header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.TitleArea {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ProjectTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.ProjectSubtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #6b7280;
}
</style>
