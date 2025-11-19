<template>
  <section class="myheader-styles flex justify-between items-center p-4">
    <div class="w-[200px]">LOGO</div>
    <div ref="menuRef" class="nav-area">
      <ul class="flex gap-8">
        <!-- 商品，下拉選單 -->
        <li
          class="menu-btn relative"
          @mouseenter="!isTouch && (openMenu = 'product')"
        >
          <button
            :class="{ active: openMenu === 'product' }"
            @click="isTouch && toggleMenu('product')"
            type="button"
          >
            商品
          </button>
          <!-- 下拉選單 -->
          <ul
            class="dropdown"
            :class="{ 'is-open': openMenu === 'product' }"
            @mouseleave="!isTouch && (openMenu = null)"
          >
            <li><a href="/products/all">全部商品</a></li>
            <li><a href="/products/new">新品上市</a></li>
            <li><a href="/products/sale">特價商品</a></li>
          </ul>
        </li>
        <!-- 活動 -->
        <li
          class="relative menu-btn"
          @mouseenter="!isTouch && (openMenu = 'event')"
        >
          <button
            :class="{ active: openMenu === 'event' }"
            @click="isTouch && toggleMenu('event')"
            type="button"
          >
            活動
          </button>
          <!-- 下拉選單 -->
          <ul
            :class="{ 'is-open': openMenu === 'event' }"
            class="dropdown"
            @mouseleave="openMenu = null"
          >
            <li><a href="/event/all">全新活動</a></li>
            <li><a href="/event/new">限時活動</a></li>
          </ul>
        </li>
        <!-- 關於 -->
        <li
          class="relative menu-btn"
          @mouseenter="!isTouch && (openMenu = 'about')"
        >
          <button
            :class="{ active: openMenu === 'about' }"
            @click="isTouch && toggleMenu('about')"
            type="button"
          >
            關於
          </button>
          <!-- 下拉選單 -->
          <ul
            :class="{ 'is-open': openMenu === 'about' }"
            class="dropdown"
            @mouseleave="openMenu = null"
          >
            <li><a href="/about/all">公司</a></li>
            <li><a href="/about/new">理念</a></li>
            <li><a href="/about/new">地點</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex justify-between w-[200px] mamber-area">
      <el-button class="" plain @click="dialogLogin = true">
        會員登入
      </el-button>
      <el-button class="" plain @click="dialogRegister = true">
        註冊
      </el-button>
    </div>
  </section>

  <!-- 登入系統 -->
  <el-dialog v-model="dialogLogin" title="登入" width="500">
    <el-form ref="formLoginRef" :model="formLogin" :rules="loginRules">
      <el-form-item prop="email">
        <el-input
          v-model="formLogin.email"
          type="text"
          autocomplete="off"
          placeholder="帳號"
        />
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
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
const userStore = useUserStore();
//寬度設定
const formLabelWidth = "100px";
//登入表單
//表單實例
const formLoginRef = ref();
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

const menuRef = ref<HTMLElement | null>(null);
// 點擊 header 外收合
function handleClickOutside(e: MouseEvent) {
  if (!menuRef.value) return;

  // 若點擊區域不在 header 裡面
  if (!menuRef.value.contains(e.target as Node)) {
    openMenu.value = null;
  }
}
//menu 下拉選單
type MenuKey = "product" | "event" | "about" | null;
const openMenu = ref<MenuKey>(null);

//偵測觸控裝置
const isTouch = matchMedia("(hover: none)").matches;
function toggleMenu(name: any) {
  // 如果點同一個 → 關閉
  openMenu.value = openMenu.value === name ? null : name;
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.myheader-styles {
  position: relative;
  left: 0;
  width: 100vw;
  background-color: #33b1fa;
  color: rgb(241, 241, 241);
  .nav-area {
    ul {
      .menu-btn {
        button {
          padding: 4px 8px;
          border-radius: 4px;
        }
        button.active {
          background-color: #0b87cf;
        }
        .dropdown {
          position: fixed;
          top: 60px;
          left: 1%;
          width: 98vw;
          min-height: 80px;
          padding: 16px;
          background-color: #eff6ff;
          color: #000;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8%;

          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: all 0.5s ease;
          li {
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 8px;
            &:hover {
              background-color: #25cccc;
              color: #000;
            }
          }
        }

        .dropdown.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      }
    }
  }
}
</style>
