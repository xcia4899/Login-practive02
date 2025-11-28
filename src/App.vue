<template>
  <div class="layout">
    <div class="header">
      <HomeView></HomeView>
    </div>
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeView from "./pages/home/Home.vue";
</script>

<style lang="scss">
.layout {
  position: relative;

  .header {
    position: relative;
    z-index: 1000; // 保證 header 比 router-view 高
  }

  .page-content {
    position: relative;
    z-index: 1; // 讓內容不要蓋過 header
  }
}
</style>
