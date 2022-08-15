import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/login-org",
    name: "LoginOrg",
    component: () => import("../views/Login/loginOrg.vue"),
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Layout/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;