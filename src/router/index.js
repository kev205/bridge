import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "history",
});

export default router;
