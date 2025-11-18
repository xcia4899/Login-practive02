<template>
  <section class="myheader-styles flex justify-between items-center p-4">
    <div>LOGO</div>
    <div class="nav-area">
      <ul class="flex gap-8">
  <!-- 商品，下拉選單 -->
  <li  class="relative"
    @mouseenter="openMenu = 'product'"
   
  >
    <button type="button"> 商品 </button>

    <!-- 下拉選單 -->
    <ul
      v-if="openMenu === 'product'"
      class="absolute left-0 top-full mt-2 bg-white shadow rounded p-2 "
       @mouseleave="openMenu = null"
    >
      <li><a href="/products/all">全部商品</a></li>
      <li><a href="/products/new">新品上市</a></li>
      <li><a href="/products/sale">特價商品</a></li>
    </ul>
  </li>

  <!-- 其它項目先當一般按鈕 -->
   <li  class="relative"
    @mouseenter="openMenu = 'event'"
    @mouseleave="openMenu = null"
  >
    <button type="button"> 活動 </button>

    <!-- 下拉選單 -->
    <ul
      v-if="openMenu === 'event'"
      class="absolute left-0 top-full mt-2 bg-white shadow rounded p-2 "
    >
      <li><a href="/event/all">全新活動</a></li>
      <li><a href="/event/new">限時活動</a></li>

    </ul>
  </li>
   <li  class="relative"
    @mouseenter="openMenu = 'about'"
    @mouseleave="openMenu = null"
  >
    <button type="button"> 活動 </button>

    <!-- 下拉選單 -->
    <ul
      v-if="openMenu === 'about'"
      class="absolute left-0 top-full mt-2 bg-white shadow rounded p-2 "
    >
      <li><a href="/about/all">公司</a></li>
      <li><a href="/about/new">理念</a></li>
      <li><a href="/about/new">地點</a></li>

    </ul>
  </li>
</ul>
    </div>
    <div class="mamber-area">
      <el-button class="" plain @click="dialogLogin = true"> 會員登入 </el-button>
      <el-button class="" plain @click="dialogRegister = true"> 註冊 </el-button>
    </div>
  </section>

  <!-- 登入系統 -->
  <el-dialog v-model="dialogLogin" title="登入" width="500">
    <el-form ref="formLoginRef" :model="formLogin" :rules="loginRules">
      <el-form-item prop="email">
        <el-input v-model="formLogin.email" type="text" autocomplete="off" placeholder="帳號"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formLogin.password"
          type="password"
          autocomplete="off"
          placeholder="密碼"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogLogin = false">取消</el-button>
        <el-button @click="submitLoginForm">確認</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 註冊系統 -->
  <!-- <el-dialog v-model="dialogRegister" title="註冊" width="500">
    <el-form :model="formRegister">
      <el-form-item label="帳號" :label-width="formLabelWidth" >
        <el-input v-model="formRegister.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密碼" :label-width="formLabelWidth">
        <el-input v-model="formRegister.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="確認密碼" :label-width="formLabelWidth">
        <el-input v-model="formRegister.passwordConfirm" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogRegister = false">取消</el-button>
        <el-button @click="dialogRegister = false">確認</el-button>
      </div>
    </template>
  </el-dialog> -->
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
const userStore = useUserStore();
//寬度設定
const formLabelWidth = "100px";
//登入表單
//表單實例
const formLoginRef = ref()
//開關表單
const dialogLogin = ref(false);
interface LoginForm {
  email: string;
  password: string;
}
const formLogin = reactive<LoginForm>({
  email: "",
  password: "",
});
//規則
const validatePwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value) {
    return callback(new Error("密碼不能為空"));
  }
  callback(); // 驗證通過
};


const loginRules = reactive({
  email: [
    { required: true, trigger: "blur", message: "請輸入帳號" },
    { type: "email", message: "請輸入正確的email格式", trigger: "blur" },
  ],
  password: [{ validator: validatePwd, trigger: "blur" }],
});
//登入方法
const submitLoginForm = () => {
  console.log("登入");
};

//註冊表單
const dialogRegister = ref(false);

interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
}
const formRegister = reactive<RegisterForm>({
  email: "",
  password: "",
  passwordConfirm: "",
});

type MenuKey = 'product' | 'event' | 'about' | null

const openMenu = ref<MenuKey>(null)

</script>

<style scoped lang="scss">
.myheader-styles{
  background-color: #33b1fa;
  color: rgb(241, 241, 241);
  .nav-area{
    ul{
      li{
        padding: 4px 8px;
        &:hover{
          background-color: #949494;
          color: #000;
        }
      }
    }
  }
}
</style>
