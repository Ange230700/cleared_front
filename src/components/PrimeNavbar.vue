<!-- src\components\PrimeNavbar.vue -->

<template>
  <nav class="card">
    <PrimeMenubar :model="menuItems">
      <template #start>
        <PrimeButton
          label="Vacuum"
          variant="link"
          size="large"
          @click="router.push('/')"
        />
      </template>

      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span v-if="item.icon" :class="[item.icon, 'mr-2']" />
          <span>{{ item.label }}</span>
          <PrimeBadge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>

      <!-- Dark/Light mode toggle button on the end slot -->
      <template #end>
        <PrimeButton
          :icon="colorMode === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"
          rounded
          :aria-label="
            colorMode === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          "
          @click="toggleDarkMode"
          class="ml-2"
        />
      </template>
    </PrimeMenubar>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import api from "~/src/axios-instance";

import { useAuth } from "~/src/composables/useAuth";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/src/stores/userStore";

const toast = useToast();
const router = useRouter();

const userStore = useUserStore();
const { setAuthenticated } = useAuth();

// Util: Get color mode from localStorage or fallback to system
function getInitialColorMode(): "light" | "dark" {
  const stored = localStorage.getItem("colorMode");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const colorMode = ref<"light" | "dark">(getInitialColorMode());

function applyColorModeClass(mode: "light" | "dark") {
  if (mode === "dark") {
    document.documentElement.classList.add("prime-dark-mode");
  } else {
    document.documentElement.classList.remove("prime-dark-mode");
  }
}

onMounted(() => {
  applyColorModeClass(colorMode.value);
});

function toggleDarkMode() {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  localStorage.setItem("colorMode", colorMode.value);
  applyColorModeClass(colorMode.value);
}

const handleLogout = async () => {
  try {
    await api.post("/api/auth/logout");
    userStore.clearUser();
    setAuthenticated(false);
    toast.add({
      severity: "info",
      summary: "Logged out",
      detail: "See you soon!",
      life: 4000,
    });
    router.push("/login");
  } catch {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error during logout",
      life: 4000,
    });
  }
};

const menuItems = computed(() => {
  const items = [
    {
      icon: "pi pi-table",
      label: "Collections",
      command: () => router.push("/collections"),
    },
  ];
  if (!userStore.user) {
    // Not logged in: show sign in/up
    items.unshift(
      {
        icon: "pi pi-user-plus",
        label: "Sign up",
        command: () => router.push("/register"),
      },
      {
        icon: "pi pi-user",
        label: "Sign in",
        command: () => router.push("/login"),
      },
    );
  } else {
    // Logged in: show logout
    items.push({
      icon: "pi pi-sign-out",
      label: "Logout",
      command: handleLogout,
    });
  }
  return items;
});
</script>

<style scoped>
.p-button {
  font-size: calc(var(--p-button-lg-font-size) * 2);
}
</style>
