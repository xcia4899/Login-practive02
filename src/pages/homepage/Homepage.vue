<template>
  <div class="homepage-container">
    <div class="homepage-header">
      練習區域
      <p>使用Swagger UI 練習請求收取</p>
    </div>
    <div class="homepage-body">
      <div class="homepage-menu">
        <button class="card card-1" @click="goToApi01">API 練習1</button>
        <button class="card card-2" @click="goToApi02">API 練習2</button>
        <button class="card card-3">API 練習3</button>
        <button class="card card-4">API 練習4</button>
        <button class="card card-5">API 練習5</button>
        <button class="card card-6" @click="goToOut">跳出</button>
      </div>
      <div class="homepage-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import testApi01 from "./testApi01.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const goToApi01 = () => {
  router.push({ name: "testApi01" });
};
const goToApi02 = () => {
  router.push({ name: "testApi02" });
};
const goToOut = () => {
  router.push({ name: "homepage" });
};
</script>

<style scoped lang="scss">
.homepage-container {
  position: relative;
  height: 100%;     /* 直接拉滿整個畫面 */
  display: flex;
  flex-direction: column;

  .homepage-header {
    // height: 40px;
    background-color: #313131;
    padding: 16px;
  }
  .homepage-body {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    height: 100%;
    .homepage-menu {
      width:  200px;
      background-color: #494949;
      color: azure;

      .card {
        margin: 24px;
        background-color: #b9b9b9;
        // color: #000;
      }
      .card:hover {
        background-color: #f8efef;
      }
      .card:active {
        background-color: #757575;
      }
    }
    .homepage-content {
      width: calc(100% - 200px);
      background: #ddd;
      color: rgb(63, 63, 63);
      
    }
  }
}
</style>
