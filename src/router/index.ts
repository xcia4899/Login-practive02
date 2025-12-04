import { createRouter, createWebHistory } from "vue-router";

let isFirstLoad = true; // ★ 用來判斷是不是第一次載入（F5）

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/Home",
    },
    {
      path: "/Home",
      name: "Home",
      component: () => import("@/pages/home/Home.vue"),
    },
    {
      path: "/homepage",
      name: "homepage",
      meta: { requiresAuth: true },
      component: () => import("@/pages/homepage/Homepage.vue"),
      children: [
        {
          path: "testApi01",
          name: "testApi01",
          component: () => import("@/pages/homepage/testApi01.vue"),
        },
        {
          path: "testApi02",
          name: "testApi02",
          component: () => import("@/pages/homepage/testApi02.vue"),
        },
        {
          path: "testApi03",
          name: "testApi03",
          component: () => import("@/pages/homepage/testApi03.vue"),
        },
        {
          path: "testApi04",
          name: "testApi04",
          component: () => import("@/pages/homepage/testApi04.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("currentUserId");

  // 1. 需要登入但未登入 → 擋掉
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert("請先登入");
    return next("/Home");
  }

  // 2. 第一次進站 / F5，而且已登入，而且目標是 /Home → 自動轉到 /homepage
  if (isFirstLoad && isLoggedIn && to.path === "/Home") {
    isFirstLoad = false;
    return next("/homepage");
  }

  // 3. 其他情況正常放行
  isFirstLoad = false;
  next();
});

export default router;
