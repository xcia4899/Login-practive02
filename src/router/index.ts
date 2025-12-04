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

export default router;
