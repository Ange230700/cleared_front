<!-- src/pages/HomePage.vue -->

<template>
  <div class="container mx-auto flex-1 p-8">
    <h1 class="mb-6 text-4xl font-bold">Welcome to Vacuum</h1>
    <template v-if="user">
      <p class="mb-2">
        Hello, <span class="font-semibold">{{ user.volunteer_name }}</span
        >!
      </p>
      <p>You are signed in and can now access all features.</p>
    </template>
    <template v-else>
      <p class="mb-2">
        To access features, please sign in or create an account.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/src/stores/userStore";
import { computed } from "vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>
