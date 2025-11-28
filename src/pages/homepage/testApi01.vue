<template>
  <div class="test-top">
    <button type="button" @click="getStoreInventory">測試</button>
  </div>
  <div>ID:{{ route.params.id }}</div>
  <div class="test-body">
      <div>不可用使用的數量：{{ getStoreData.unavailable }}</div>
      <div>總數量:{{ total }}</div>
    <br />
    <button @click="openContent = !openContent">開關</button>

    <div v-if="openContent">全部:{{ getStoreData }}</div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const openContent = ref(false);
// console.log(route.params.id); // 123
const total = computed(() => {
  return Object.values(getStoreData.value).reduce((sum, n) => sum + n, 0);
});
const getStoreData = ref<Record<string, number>>({});
const getStoreInventory = async () => {
  try {
    const res = await axios.get(
      "https://petstore.swagger.io/v2/store/inventory"
    );
    getStoreData.value = res.data;

    console.log("內容:", getStoreData.value);
  } catch (err) {
    console.log("失敗:", err);
    throw err;
  }
};
</script>

<style scoped lang="scss">
.test-top {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.test-body {
  border: 1px solid;
  height: 80%;
  //   width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
