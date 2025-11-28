import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home/Home.vue"),
    },
    {
      path: "/homepage",
      name: "homepage",
      component: () => import("@/pages/homepage/Homepage.vue"),
      children: [
        {
          path: "testApi01",
          name: "testApi01",
          component: () => import("@/pages/homepage/testApi01.vue"),
        },
      ],
    },
  ],
});

export default router;
