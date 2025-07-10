<!-- src/pages/NotFoundPage.vue -->

<template>
  <div
    class="container mx-auto flex min-h-screen flex-col items-center justify-center p-8"
  >
    <h1 class="mb-4 text-6xl font-bold text-primary">404</h1>
    <p class="mb-8 text-2xl">
      Sorry, the page you are looking for does not exist.
    </p>
    <PrimeButton label="Go to Home" icon="pi pi-home" @click="goHome" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function goHome() {
  router.push("/home");
}
</script>
