<template>
  <div class="TransactionList">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.TransactionList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
