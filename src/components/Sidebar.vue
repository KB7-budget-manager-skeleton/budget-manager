<template>
  <aside class="Sidebar">
    <nav class="NavMenu">
      <router-link to="/" class="NavLink">대시보드</router-link>
      <router-link to="/record" class="NavLink">거래 등록</router-link>
      <router-link to="/transactions" class="NavLink">거래 내역</router-link>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.Sidebar {
  width: 220px;
  padding: 20px 16px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
}

.NavMenu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.NavLink {
  display: block;
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
}

.NavLink.router-link-active {
  background-color: #eef2ff;
  color: #4338ca;
}
</style>
