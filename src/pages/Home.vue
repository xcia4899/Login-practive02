<template>
  <div>
    <h1>Home View</h1>
    {{ userStore.token }}
    <el-button type="primary">按鈕</el-button>
  </div>
  <div class="p-2 bg-red-100 text-white text-2xl font-bold ">
  Tailwind v4 OK
</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
// import { ElButton } from "element-plus";
const userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
