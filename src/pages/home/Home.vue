<template>
  <nav class="myheader-styles flex justify-between items-center p-4">
    <div class="w-[300px]">LOGO</div>
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
    <div class="mamber-area w-[300px]">
      <template  v-if="isLoggedIn">
       <div class="flex items-center gap-3">
          <span>{{ currentUser?.email }}</span>
          <el-button @click="logout">登出</el-button>
       </div>
      </template>
      <template v-else>
        <div class="login-regisster">
          <el-button class="mamber-login" plain @click="dialogLogin = true">
            登入
          </el-button>
          <el-button
            class="mamber-regisster"
            plain
            @click="dialogRegister = true"
          >
            註冊
          </el-button>
          <div class="member">會員</div>
        </div>
      </template>
    </div>
  </nav>

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

    <!-- <div v-if="formLoginRef.users.length<0">
      沒有帳號
    </div> -->
  </el-dialog>

  <!-- 註冊系統 -->
  <el-dialog v-model="dialogRegister" title="註冊" width="500">
    <el-form ref="formRegisterRef" :model="formRegister" :rules="registerRule">
      <el-form-item prop="email">
        <el-input
          v-model="formRegister.email"
          type="text"
          autocomplete="off"
          placeholder="帳號"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formRegister.password"
          type="password"
          autocomplete="off"
          placeholder="密碼"
          show-password
        />
      </el-form-item>
      <el-form-item prop="passwordConfirm">
        <el-input
          v-model="formRegister.passwordConfirm"
          type="password"
          autocomplete="off"
          placeholder="再次輸入密碼"
          show-password
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogRegister = false">取消</el-button>
        <!-- 這裡直接呼叫，不要傳參數 -->
        <el-button @click="submitRegisterForm">確認</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { adminLoginApi } from "@/api/modules/user";
import  { useRouter  } from "vue-router";
const router = useRouter();
// ================== 型別與常數 ==================
const USERS_KEY = "users"; // 使用者清單 key

interface UserRecord {
  id: number; // 自己產生的 ID
  email: string; // 註冊帳號
  password: string; // 註冊密碼
  token: string; // 後端回傳的 token
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

// ================== localStorage 工具 ==================
function loadUsers(): UserRecord[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserRecord[];
  } catch {
    return [];
  }
}

function saveUsers(users: UserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ================== 登入狀態 ==================

// 登入 ID（關鍵：畫面要跟著變就要用 ref）
const currentUserId = ref<string | null>(localStorage.getItem("currentUserId"));

// 目前登入的使用者
const currentUser = computed<UserRecord | null>(() => {
  const id = currentUserId.value;
  if (!id) return null;

  const users = loadUsers();
  
  return users.find((u) => String(u.id) === id) ?? null;
});

// 是否登入
const isLoggedIn = computed(() => {
return currentUser.value !== null}
);
if(isLoggedIn.value){
  router.push('/homepage')
}
// 除錯用
console.log("currentUser:", currentUser.value);
console.log("是否登入:", isLoggedIn.value);

// 登出
function logout() {
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("msToken"); // 如果有用 token
  currentUserId.value = null; // ★ 讓畫面更新
  router.replace('/')
}

const userStore = useUserStore();

// ================== 登入表單 ==================
const formLoginRef = ref();
const dialogLogin = ref(false);

const formLogin = reactive<LoginForm>({
  email: "sss@aaa.com",
  password: "aaaaaa",
});

const validatePwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value) {
    return callback(new Error("密碼不能為空"));
  }
  callback();
};

const loginRules = reactive({
  email: [
    { required: true, trigger: "blur", message: "請輸入帳號" },
    {
      required: true,
      type: "email",
      message: "請輸入正確的 email 格式",
      trigger: "blur",
    },
  ],
  password: [{ validator: validatePwd, trigger: "blur" }],
});

// 登入方法
const submitLoginForm = async () => {
  if (!formLoginRef.value) return;

  // 先做 Element Plus 表單驗證
  try {
    await formLoginRef.value.validate();
    console.log("登入表單驗證成功");
  } catch (err) {
    console.log("登入表單驗證失敗", err);
    return;
  }

  //  從 localStorage 撈使用者清單
  const users = loadUsers();
  console.log("目前所有 users:", users);
  if (users.length === 0) {
    console.log("目前沒有任何註冊帳號");
    alert("目前沒有任何註冊帳號");
    return;
  }
  //  用 email 找使用者
  const user = users.find((u) => u.email === formLogin.email);
  if (!user) {
    console.log("帳號錯誤：找不到這個 email");
    alert("帳號錯誤：找不到這個 email");
    return;
  }
  // 比對密碼
  if (user.password !== formLogin.password) {
    console.log("密碼錯誤");
    alert("密碼錯誤");
    return;
  }

  // 登入成功
  console.log("登入成功，使用者：", user);

  // 紀錄目前登入者
  localStorage.setItem("currentUserId", String(user.id));
  localStorage.setItem("msToken", user.token);
  //改變ID狀態
  currentUserId.value = String(user.id);
  //關閉彈跳視窗
  dialogLogin.value = false;
  router.push('/homepage')
};

// 登入 dialog 關閉時清除表單
watch(dialogLogin, (val) => {
  if (!val && formLoginRef.value) {
    formLoginRef.value.resetFields();
  }
});

// ================== 註冊表單 ==================
const dialogRegister = ref(false);
const formRegisterRef = ref();

const formRegister = reactive<RegisterForm>({
  email: "",
  password: "",
  passwordConfirm: "",
});

const validateRegisterPwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value) {
    return callback(new Error("密碼不能為空"));
  }
  callback();
};

const validateConfirmPwd = (
  rule: unknown,
  value: string,
  callback: (error?: Error) => void
) => {
  if (!value) {
    return callback(new Error("請再次輸入密碼"));
  }
  if (value !== formRegister.password) {
    return callback(new Error("兩次輸入的密碼不一致"));
  }
  callback();
};

const registerRule = reactive({
  email: [
    { required: true, trigger: "blur", message: "請輸入帳號" },
    { type: "email", message: "請輸入正確的 email 格式", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: "密碼為長度為 6–20 位",
      trigger: "blur",
    },
    { validator: validateRegisterPwd, trigger: "blur" },
  ],
  passwordConfirm: [
    { required: true, message: "請再次輸入密碼", trigger: "blur" },
    { validator: validateConfirmPwd, trigger: "blur" },
  ],
});

let token: any = null;

const submitRegisterForm = async () => {
  if (!formRegisterRef.value) return;

  // 先做表單驗證
  try {
    await formRegisterRef.value.validate();
    console.log("註冊表單驗證成功");
    console.log("註冊帳號", formRegister.email);
    console.log("註冊密碼", formRegister.password);
  } catch (err) {
    console.log("註冊表單驗證失敗", err);
    return;
  }

  // 2. 呼叫 Demo API 取得 token（用 reqres 作假的）
  try {
    const res = await adminLoginApi({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    console.log("API 回傳:", res);
    token = res; // 假設 res = { id, token }
  } catch (err: any) {
    console.log("API 錯誤 status:", err.response?.status);
    console.log("API 錯誤 body:", err.response?.data);
    return;
  }

  // 建立新的使用者資料
  const newUser: UserRecord = {
    id: Date.now(),
    email: formRegister.email,
    password: formRegister.password,
    token: token.token, // 依實際 API 形狀調整
  };

  // 存入 users 陣列
  const users = loadUsers();
  users.push(newUser);
  saveUsers(users);

  console.log("已新增使用者：", newUser);

  // 設為「已登入」
  localStorage.setItem("currentUserId", String(newUser.id));
  localStorage.setItem("msToken", newUser.token);
  currentUserId.value = String(newUser.id); // ★ 讓畫面跟著變
  dialogRegister.value = false;
};

// 註冊 dialog 關閉時清除表單
watch(dialogRegister, (val) => {
  if (!val && formRegisterRef.value) {
    formRegisterRef.value.resetFields();
  }
});

// 下拉選單邏輯 ==================
const menuRef = ref<HTMLElement | null>(null);

function handleClickOutside(e: MouseEvent) {
  if (!menuRef.value) return;
  if (!menuRef.value.contains(e.target as Node)) {
    openMenu.value = null;
  }
}

type MenuKey = "product" | "event" | "about" | null;
const openMenu = ref<MenuKey>(null);

const isTouch = matchMedia("(hover: none)").matches;

function toggleMenu(name: MenuKey) {
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
  padding: 8px 64px;
  position: relative;
  // height: 60px;
  left: 0;
  
  background-color: #33b1fa;
  color: rgb(241, 241, 241);
   z-index: 1000; 
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
  .mamber-area {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-regisster {
    position: relative;
    height: 100%;
    width: 100px;
    // min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ce5151;
    // height: 60px;
    padding: 8px;

    transition: all 0.4s ease;
    // overflow: hidden;
    background-color: #33b1fa;
    &:hover {
      // height: 200px;
      .mamber-login {
        top: 40px;
      }
      .mamber-regisster {
        top: 80px;
      }
    }

    .member,
    .mamber-login,
    .mamber-regisster {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      z-index: 1;
      top: 0%;
      width: 100px;
      height: 30px;
      position: absolute;
      // padding: 4px 8px;
      margin: 0;
      opacity: 1;
      transition: all 0.4s ease;
    }
    .member {
      z-index: 2;
      height: auto;
      background-color: #33b1fa;
    }
  }
}
</style>
