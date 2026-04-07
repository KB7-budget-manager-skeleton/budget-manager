<template>
  <div class="FilterBar">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.FilterBar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
