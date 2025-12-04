<template>
  <div class="layout">
    <div class="header">
      <Header />
    </div>
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/pages/header/Header.vue";
</script>

<style lang="scss">
.layout {
  position: relative;

  .header {
    width: 100%;
    height: 56px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #313131;
  }

  .page-content {
    position: relative;
    height: calc(100vh - 56px);
    margin-top: 56px;
    overflow-y: auto;
    z-index: 1;
  }
}
</style>
