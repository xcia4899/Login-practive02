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
    <h3 v-if="openContent">{{ errMessage }}</h3>
    <div v-if="!openContent" class="test-body">
      <h3>{{errMessage}}</h3>
      <div class="item"><b>ID:</b>{{ statusItem.id }}</div>
      <div class="item"><b>名稱:</b>{{ statusItem.name }}</div>
      <div class="item"><b>類型:</b>{{ statusItem.status }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useFetchState ,sleep} from "@/composables/useFetchStateShow";

const { openContent, errMessage, setState } = useFetchState();


const statusItem = ref<any>({
  id: null,
  name: "",
  status: "",
});
const editName = ref("");

const openSupporMessage = ref(false);
errMessage.value = ("點擊'取得清單'以獲取資料");


const updatePet = (body: any) => {
  return axios.put("https://petstore.swagger.io/v2/pet", body);
};

const saveUpdatePet = async () => {
  if (!statusItem.value || !statusItem.value.id) {
    setState(true, "請先取得資料再進行更新");
    return;
  }
  
  setState(false, "修改中...");
  await sleep(400); // 模擬等待時間

  if (!editName.value) {
    setState(false, "名稱不能留空");
    return;
  }

  try {
    const body = {
      ...statusItem.value, // 保留原本 id、status 等欄位
      name: editName.value, // 只把名稱改成輸入框的值
    };

    const res = await updatePet(body);
    statusItem.value = res.data;
    console.log("成功更新名稱");
    setState(false, "已更新名稱");
  } catch (err) {
    console.log("失敗", err);
    setState(false, "更新失敗");
    // throw err;
  }
};


const getPetId = (petId: number) => {
  return axios.get(`https://petstore.swagger.io/v2/pet/${petId}`);
};

const savePetId = async () => {
  const petId = random(1, 99);

  setState(true, "讀取中...");
  try {
    let res = await getPetId(petId);
    statusItem.value = res.data;
    // editName.value = res.data.name ?? ""; // ← 同步到輸入框
    setState(false, "成功讀取資料!");
  } catch (err) {
    console.log("失敗", err);
    setState(true, "沒有資料，點擊按鈕重新取得");
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
