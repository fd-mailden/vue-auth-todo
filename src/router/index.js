import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { APP_ROUTES } from "./routes";

Vue.use(VueRouter);

const { LOGIN, TODO, NOT_FOUND } = APP_ROUTES;

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: LOGIN.path,
      name: LOGIN.name,
      component: LOGIN.component,
      meta: LOGIN.meta,
    },
    {
      path: TODO.path,
      name: TODO.name,
      component: TODO.component,
      meta: TODO.meta,
    },
    {
      path: NOT_FOUND.path,
      name: NOT_FOUND.name,
      component: NOT_FOUND.component,
      meta: NOT_FOUND.meta,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === LOGIN.name && store.getters["auth/isLoggedIn"]) {
    next({
      name: TODO.name,
    });

    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }

    next("/login");
  } else {
    next();
  }
});

export default router;
