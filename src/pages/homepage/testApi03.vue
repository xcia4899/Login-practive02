<template>
  <div class="test-page">
    <div class="test-top">
      <input type="number" v-model.number="petId" placeholder="輸入數字" />
      <button type="button" @click="getPet">取得清單</button>
    </div>
    <h3>API03練習: Path 參數（/pet/{petId}）</h3>
    <hr />

    <div class="test-body">
      <!-- {{ petData }} -->
      <div v-if="!openContent && petData ">
        <p><b>ID</b>:{{ petData?.id }}</p>
        <p><b>category</b>:{{ petData?.category.id }}-{{ petData?.category.name }}</p>
        <p><b>Name</b>:{{ petData?.name }}</p>
        <p><b>photoUrls</b>:{{ petData?.photoUrls }}</p>
        <p><b>tags</b>:{{ petData?.tags.id }}{{ petData?.tags.name }}</p>
        <p><b>status</b>:{{ petData?.status }}</p>
      </div>
      <div v-else><h3>無此ID資料</h3></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const openContent = ref(false);

const petId = ref<number | null>(null);
const petData = ref<any>(null);

const fetchPet = async (id: number) => {
  try {
    const { data } = await axios.get(
      `https://petstore.swagger.io/v2/pet/${id}`
    );
    petData.value = data;
  } catch (err) {
    console.log("錯誤:", err);
    openContent.value = true;
  }
};

const getPet = async () => {
  console.log("點擊 petId:", petId.value);

  if (petId.value == null) {
    console.log("請輸入 數字");
    return;
  }

  await fetchPet(petId.value);
};
</script>

<style scoped lang="scss">
h3 {
  font-size: 30px;
}
hr {
  margin: 6px 0;
}
p{
    font-size: 20px;
    border: 1px solid ;
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
