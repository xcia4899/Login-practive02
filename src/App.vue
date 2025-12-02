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
  // width: 100%;
  // height: 100vh; // 確保整個 Layout 就是滿版高度

  .header {
    width: 100%;
    height: 56px;
    position: fixed;     // 讓 header 固定在上方
    top: 0;
    left: 0;
    z-index: 1000;
    background: #313131; // 避免背景透明時看穿內容
  }

  .page-content {
    position: relative;
    height: calc(100vh - 56px);
    margin-top: 56px;    // 避免內容被 fixed header 蓋住
    overflow-y: auto;    // 常用：讓內容超出時可以捲動
    z-index: 1;
  }
}

</style>
