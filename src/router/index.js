import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) next();
});

export default router;
