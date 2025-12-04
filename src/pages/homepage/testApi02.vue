<template>
  <div class="test-page">
    <div class="test-top">
      <button type="button" @click="getPets('available')">
        取得 available 清單
      </button>
      <button type="button" @click="getPets('pending')">
        取得 pending 清單
      </button>
      <button type="button" @click="getPets('sold')">取得 sold 清單</button>
    </div>
    <h3>API02練習: 含 Query 參數的 API</h3>
    <hr />
    <button @click="openContent = !openContent">
      {{ openContent ? "部分顯示" : "全部展開" }}
    </button>
    <h4></h4>
    <div class="message">
      {{ openContent ? "全部資料" : "前五筆資料" }} --- {{ showMessage }}
    </div>
    <div v-if="!openContent">
      <div
        v-for="(pet, index) in petList.slice(0, 5)"
        :key="`${pet.id}-${index}`"
        class="item"
      >
        <div class="id">no.{{ index + 1 }}：{{ pet.id }}</div>
        <div class="name">{{ pet.name }}</div>
      </div>
    </div>
    <div v-else class="test-body">
      <div
        v-for="(pet, index) in petList"
        :key="`${pet.id}-${index}`"
        class="item"
      >
        <div class="id">no.{{ index + 1 }}：{{ pet.id }}</div>
        <div class="name">{{ pet.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useFetchState, sleep } from "@/composables/useFetchState";

const { openContent, showMessage, setState } = useFetchState();

type typePet = "available" | "pending" | "sold";
interface Pet {
  id: number;
  name: string;
  status: typePet;
}

const petList = ref<Pet[]>([]);
// const openContent = ref(false);

//獲取API資料
const fetchPets = async (status: typePet) => {
  const { data } = await axios.get<Pet[]>(
    "https://petstore.swagger.io/v2/pet/findByStatus",
    { params: { status } }
  );
  return data;
};

//選擇狀態
const getPets = async (status: typePet) => {
  setState(true, `正在取得 ${status} 中...`);
  await sleep(400); //設定最短讀取時間
  try {
    const data = await fetchPets(status);
    petList.value = data;
    setState(true, `已取得${status}資料，共 ${data.length} 筆`);
  } catch (err) {
    console.log(err);
    setState(true, `錯誤:無法取得${status}資料`);
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
.message {
  font-size: 20px;
  margin: 6px 0;
}
button {
  // height: 0px;
  padding: 4px 8px;
  margin: 0 8px 0 ;
}
.test-page {
  padding: 16px;
  background: #ddd;
  display: flex;
  flex-direction: column; // ★ 讓下面能吃滿剩餘空間
  height: calc(100vh - 80px - 56px); // ★ 必須要有高度基準

  .test-top {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .test-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .item {
    border: 1px solid #000;
    margin: 6px 0;
    padding: 4px 8px;
  }
}
</style>
