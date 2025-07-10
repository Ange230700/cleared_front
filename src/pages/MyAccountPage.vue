<!-- src/pages/MyAccountPage.vue -->

<template>
  <div class="container mx-auto max-w-lg p-8">
    <h1 class="mb-4 text-2xl font-bold">My Account</h1>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.volunteer_name }}</p>
      <p><strong>Email:</strong> {{ user.volunteer_email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>
    <div v-else>
      <PrimeMessage severity="warn">Not logged in.</PrimeMessage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/src/stores/userStore";
const { user } = useUserStore();
</script>
