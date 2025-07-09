// src\router\index.ts

import { createRouter, createWebHistory } from "vue-router";

import { useAuth } from "~/src/composables/useAuth";
import { useUserStore } from "~/src/stores/userStore";

const LoginPage = () => import("~/src/pages/LoginPage.vue");
const RegisterPage = () => import("~/src/pages/RegisterPage.vue");
const HomePage = () => import("~/src/pages/HomePage.vue");
const CollectionListPage = () => import("~/src/pages/CollectionListPage.vue");
const CollectionAddPage = () => import("~/src/pages/CollectionAddPage.vue");
const CollectionEditPage = () => import("~/src/pages/CollectionEditPage.vue");
const VolunteerListPage = () => import("~/src/pages/VolunteerListPage.vue");
const VolunteerAddPage = () => import("~/src/pages/VolunteerAddPage.vue");
const VolunteerEditPage = () => import("~/src/pages/VolunteerEditPage.vue");
const MyAccountPage = () => import("~/src/pages/MyAccountPage.vue");
const NotFoundPage = () => import("~/src/pages/NotFoundPage.vue");

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  {
    path: "/collections",
    name: "CollectionList",
    component: CollectionListPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/collections/add",
    name: "CollectionAdd",
    component: CollectionAddPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/collections/:id/edit",
    name: "CollectionEdit",
    component: CollectionEditPage,
    props: true,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/volunteers",
    name: "VolunteerList",
    component: VolunteerListPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/volunteers/add",
    name: "VolunteerAdd",
    component: VolunteerAddPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/volunteers/:id/edit",
    name: "VolunteerEdit",
    component: VolunteerEditPage,
    props: true,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: MyAccountPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// -- Auth Navigation Guards --
router.beforeEach(async (to, _, next) => {
  const { isAuthenticated, fetchAuth } = useAuth();
  const userStore = useUserStore();

  // Wait for auth status if not bootstrapped
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    const ok = await fetchAuth();
    if (!ok) return next("/login");
  }

  // Admin route guard
  if (to.meta.requiresAdmin && userStore.user?.role !== "admin") {
    return next("/home");
  }

  // Block access to login/register for logged-in users
  if (
    (to.path === "/login" || to.path === "/register") &&
    isAuthenticated.value
  ) {
    return next("/home");
  }

  next();
});

export default router;
