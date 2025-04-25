import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/Favorites.vue"),
  },
  {
    path: "/contribute",
    name: "Contribute",
    component: () => import("@/views/Contribute.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
