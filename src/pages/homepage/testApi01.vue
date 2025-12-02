<template>
  <div class="page">
    <div class="test-top">
      <button type="button" @click="getStoreInventory">點擊獲取資料</button>
    </div>

    <h3>API01練習: axios.get</h3>
    <hr />
    <div class="test-body">
      <div>不可用使用的數量：{{ getStoreData.unavailable }}</div>
      <div >總數量:{{ total }}</div>
      <br />
      <button @click="openContent = !openContent">
        {{ openContent ? "隱藏" : "顯示" }}
      </button>
      <div v-if="openContent" class="itemArea">
        <div v-for="(item, index) in getStoreData" class="item">
          <div>項目{{ index }} :數量{{ item }}</div>
          <div></div>
        </div>
      </div>
    </div>
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
    openContent.value = true;
    console.log("內容:", getStoreData.value);
  } catch (err) {
    console.log("失敗:", err);
    throw err;
  }
};
</script>

<style scoped lang="scss">
.page {
  padding: 16px;
}
h3 {
  font-size: 30px;
}
hr {
  margin: 6px 6px;
}
.test-top {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.test-body {
  // border: 1px solid;
  // height: 80%;
  width: 100%;
  
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  .itemArea {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px;
    margin-top: 12px;
    .item{
      padding: 4px;
      border: 1px solid ;
    }
  }
}
</style>
