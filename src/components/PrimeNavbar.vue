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

      <template #end>
      </template>
    </PrimeMenubar>
  </nav>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from "~/src/axios-instance";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAuth } from "~/src/composables/useAuth";
import { useUserStore } from "~/src/stores/userStore";
import { useToast } from "primevue/usetoast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toast = useToast();
const router = useRouter();
 
// const { isAuthenticated, setAuthenticated, fetchAuth } = useAuth();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userStore = useUserStore();

const menuItems = computed(() => {
  return [
    {
      icon: "pi pi-home",
      label: "Home",
      command: () => router.push("/"),
    },
  ];
});
</script>
