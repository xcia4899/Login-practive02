<template>
  <div class="test-page">
    <div class="test-top">
      <input type="number" v-model.number="petId" placeholder="輸入數字" />
      <button type="button" @click="getPet">取得清單</button>
    </div>
    <h3>API03練習: Path 參數（/pet/{petId}）</h3>
    <hr />

    <div class="test-body">
      <!-- 有資料的情況 -->
       <h3>{{ errMessage }}</h3>
      <div v-if="  petData">
        
        <p><b>ID</b>：{{ petData.id }}</p>
        <p>
          <b>category</b>： {{ petData.category?.id }} -
          {{ petData.category?.name }}
        </p>
        <p><b>Name</b>：{{ petData.name }}</p>
        <p><b>photoUrls</b>：{{ petData.photoUrls }}</p>
        <p>
          <b>tags</b>：
          <!-- tags 是陣列，這裡只示範第一個 -->
          {{ petData.tags?.[0]?.id }} - {{ petData.tags?.[0]?.name }}
        </p>
        <p><b>status</b>：{{ petData.status }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useFetchState ,sleep} from "@/composables/useFetchStateShow";

const { openContent, errMessage, setState } = useFetchState();

const petId = ref<number | null>(null);
const petData = ref<any>(null);

errMessage.value = "點擊『取得清單』以獲取資料";


const fetchPet = async (id: number) => {
  const { data } = await axios.get(
    `https://petstore.swagger.io/v2/pet/${id}`
  );
  return data;
};

const getPet = async () => {
  console.log("點擊 petId:", petId.value);

  // 1. 檢查輸入
  if (petId.value == null) {
    console.log("請輸入 數字");
     setState(true, "檢查中...");
    await sleep(500)
    setState(true, "請輸入數字");
    return;
  }

  // 2. 進入讀取中狀態
  setState(true, "讀取中...");

  try {
    const data = await fetchPet(petId.value);

    petData.value = data;
    setState(true, "成功獲取資料");
  } catch (err) {
    console.log("錯誤:", err);
  
    petData.value = null;
    petId.value = null;
    setState(true, "無此 ID 資料，請重新輸入數字");
  }
};

</script>

<style scoped lang="scss">
h3 {
  font-size: 30px;
}
hr {
  margin: 6px 0;
}
p {
  font-size: 20px;
  border: 1px solid;
  margin: 6px 0;
  padding: 4px 8px;
}
.test-page {
  padding: 16px;
  background: #ddd;

  .test-top {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  .showTwo {
    display: flex;
    justify-content: center;
    gap: 6px;
    .itemTop {
      border: 1px solid #000;
      margin: 6px 0;
      padding: 4px 8px;
    }
  }

  .test-body {
    margin-top: 16px;
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    .item {
      border: 1px solid #000;
      margin: 6px 0;
      padding: 4px 8px;
    }
  }
}
</style>
