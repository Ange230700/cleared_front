// src\router\index.ts

import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "~/src/composables/useAuth";
import HelloWorld from "~/src/components/HelloWorld.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: HelloWorld },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const { isAuthenticated, fetchAuth } = useAuth();

  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      const ok = await fetchAuth();
      return ok ? next() : next("/login");
    }
    return next();
  }

  next();
});

export default router;
