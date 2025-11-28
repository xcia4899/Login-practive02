<template>
  <div class="homepage-container">
    <div class="homepage-header">
      練習區域
      <p>使用Swagger UI 練習請求收取</p>
    </div>
    <div class="homepage-body">
      <div class="homepage-menu">
        <button class="card card-1" @click="goToinfo">API 練習1</button>
        <button class="card card-2">API 練習2</button>
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
const goToinfo = () => {
  router.push({ name: 'testApi01' })
};
const goToOut =()=>{
    router.push({ name: 'homepage' })
}
</script>

<style scoped lang="scss">

.homepage-container {
  * {
    text-align: center;
  }
  position: relative;

  min-height: 100%; // 內容需要多高就多高
  max-height: 100vh; // 不能超過整個螢幕
  //   height: 100vh;
  display: flex;
  flex-direction: column;
  .homepage-header {
    // height: 40px;
    background-color: #313131;
    padding: 16px;
  }
  .homepage-body {
    display: flex;
    justify-content: flex-start;
    height: 700px;
    .homepage-menu {
      width: 250px;
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
      flex: 1;
      width: 100%;
      background-color: #b6b6b6;
      color: rgb(63, 63, 63);
        overflow: hidden;
     
    }
  }
}
</style>
