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

<style scoped>
main {
  padding: 20px;
}
</style>
