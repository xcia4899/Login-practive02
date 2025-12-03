<template>
  <div class="test-page">
    <div class="test-top">
      <button type="button" @click="findPetsByStatus('available')">
        取得 available 清單
      </button>
      <button type="button" @click="findPetsByStatus('pending')">
        取得 pending 清單
      </button>
      <button type="button" @click="findPetsByStatus('sold')">
        取得 sold 清單
      </button>
    </div>
    <h3>API02練習: 含 Query 參數的 API</h3>
    <hr />
    <div v-if="!openContent && petList.length >= 2">
      <!-- <div>前五筆資料</div> -->
      <div class="showTwo">
        <div
          v-for="(pet, index) in petList.slice(0, 5)"
          :key="pet.id"
          class="itemTop"
        >
          <div class="id">No. {{ index + 1 }}：{{ pet.id }}</div>
          <div class="name">Name: {{ pet.name }}</div>
        </div>
      </div>
    </div>
    <button @click="openContent = !openContent">
      {{ openContent ? "部分顯示" : "全部展開" }}
    </button>
    <div class="test-body">
      <!-- 有資料才顯示列表 -->
       
      <div v-if="openContent">
        <h3>全部資料</h3>
        <div v-for="(pet, index) in petList" :key="pet.id" class="item">
          <div class="id">no.{{ index + 1 }}：{{ pet.id }}</div>
          <div class="name">{{ pet.name }}</div>
        </div>
      </div>
      <!-- 除錯用：沒有資料時的提示 -->
      <h3 v-else>只展示前五筆資料</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

interface Pet {
  id: number;
  name: string;
  status: "available" | "pending" | "sold";
}

const petList = ref<Pet[]>([]);
const openContent = ref(false);

const findPetsByStatus = async (status: "available" | "pending" | "sold") => {
  const { data } = await axios.get<Pet[]>(
    "https://petstore.swagger.io/v2/pet/findByStatus",
    {
      params: { status },
    }
  );
  petList.value = data;
  //   openContent.value = true        // 抓到資料後順便打開列表
};
</script>

<style scoped lang="scss">
h3 {
  font-size: 30px;
}
hr {
  margin: 6px 0;
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
