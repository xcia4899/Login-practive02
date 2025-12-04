<template>
  <div class="test-page">
    <div class="test-top">
      <div><button type="button" @click="savePetId">取得清單</button></div>
      <div>
        <input type="text" v-model="editName" />
        <button type="button" @click="saveUpdatePet">修改名稱</button>
      </div>
    </div>
    <h3>API04練習: PUT（更新資料））&& DELETE（刪除資料）</h3>
    <hr />
    <h3 v-if="!openSupporMessage">{{ errMessage }}</h3>
    <div v-else class="test-body">
      <div>ID:{{ statusItem.id }}</div>
      <div>名稱:{{ statusItem.name }}</div>
      <div>體重:{{ statusItem.status }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const statusItem = ref<any>({
  id: null,
  name: "",
  status: "",
});
const editName = ref("");

const openSupporMessage = ref(false);
const errMessage = ref("點擊'取得清單'以獲取資料");
const showSupportText = (isOpen: boolean, content: string) => {
  openSupporMessage.value = isOpen;
  errMessage.value = content;
};

const updatePet = (body: any) => {
  return axios.put("https://petstore.swagger.io/v2/pet", body);
};
const saveUpdatePet = async () => {
  if (!statusItem.value || !statusItem.value.id) {
    alert("請先按「取得清單」取得一筆寵物資料");
    return;
  }

  try {
    const body = {
      ...statusItem.value, // 保留原本 id、status 等欄位
      name: editName.value, // 只把名稱改成輸入框的值
    };

    let res = await updatePet(body);

    statusItem.value = res.data;
    console.log("成功更新名稱");
  } catch (err) {
    console.log("失敗", err);
    // throw err;
  }
};
const getPetId = (petId: number) => {
  return axios.get(`https://petstore.swagger.io/v2/pet/${petId}`);
};

const savePetId = async () => {
  const petId = random(1, 99);

  showSupportText(false, "讀取中...");
  try {
    let res = await getPetId(petId);
    statusItem.value = res.data;
    // editName.value = res.data.name ?? ""; // ← 同步到輸入框
    showSupportText(true, "成功讀取資料!");
  } catch (err) {
    console.log("失敗", err);
    showSupportText(false, "沒有資料，點擊按鈕重新取得");
  }
};

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    flex-direction: column;
    align-items: center;
    gap: 8px;
    button {
      width: 120px;
    }
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
    font-size: 24px;
    .item {
      border: 1px solid #000;
      margin: 6px 0;
      padding: 4px 8px;
    }
  }
}
</style>
