<!-- src\components\PrimeNavbar.vue -->

<template>
  <nav class="card px-4 pt-8">
    <PrimeMenubar :model="menuItems">
      <template #start>
        <p class="text-4xl font-bold">Vacuum</p>
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

      <template #end> </template>
    </PrimeMenubar>
  </nav>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import api from "~/src/axios-instance";

import { useAuth } from "~/src/composables/useAuth";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/src/stores/userStore";

const toast = useToast();
const router = useRouter();

const userStore = useUserStore();
const { setAuthenticated } = useAuth();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleLogout = async () => {
  try {
    await api.post("/api/auth/logout");
    userStore.clearUser();
    setAuthenticated(false);
    toast.add({
      severity: "info",
      summary: "Déconnecté",
      detail: "À bientôt !",
    });
    router.push("/login");
  } catch {
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Erreur lors de la déconnexion",
    });
  }
};

const menuItems = computed(() => {
  return [
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
    {
      icon: "pi pi-table",
      label: "Collections",
      command: () => router.push("/collections"),
    },
  ];
});
</script>
