<template>
  <div class="test-top">
    
    <button type="button" @click="getStoreInventory">測試</button>
    
  </div>
   <div>ID:{{ route.params.id }}</div>
  <div class="test-body">
    {{ getStoreData }}
  </div>
 
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute()

console.log(route.params.id) // 123
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
