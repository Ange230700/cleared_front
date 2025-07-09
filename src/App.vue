<!-- src\App.vue -->

<template>
  <div v-if="bootstrapped" class="flex min-h-screen flex-col">
    <PrimeToast />
    <PrimeNavbar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import PrimeNavbar from "~/src/components/PrimeNavbar.vue";
import FooterComponent from "~/src/components/FooterComponent.vue";

import { useAuth } from "~/src/composables/useAuth";

const { fetchAuth, bootstrapped } = useAuth();

onMounted(fetchAuth);
</script>
