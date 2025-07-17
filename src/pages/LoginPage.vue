<!-- src/pages/LoginPage.vue -->

<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-4">
    <PrimeToast />
    <div class="card w-full max-w-md p-6">
      <h2 class="mb-4 text-2xl font-bold">Connexion</h2>
      <PrimeForm @submit="onLogin">
        <PrimeFormField label="Email" name="email" class="mb-3">
          <PrimeInputText
            v-model="email"
            type="email"
            required
            autocomplete="email"
          />
        </PrimeFormField>
        <PrimeFormField label="Password" name="password" class="mb-4">
          <PrimePassword
            v-model="password"
            toggleMask
            required
            autocomplete="current-password"
          />
        </PrimeFormField>
        <PrimeButton
          label="Sign In"
          type="submit"
          class="mb-2 w-full"
          :loading="loading"
        />
        <div class="mt-2 flex items-center justify-between">
          <router-link to="/register" class="text-primary underline"
            >Create an account</router-link
          >
        </div>
      </PrimeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import api from "~/src/axios-instance";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/src/stores/userStore";

const email = ref("");
const password = ref("");
const loading = ref(false);
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

async function onLogin() {
  loading.value = true;
  try {
    const { data } = await api.post("/api/auth/login", {
      volunteer_email: email.value,
      password: password.value,
    });
    userStore.setUser(data.user);
    toast.add({
      severity: "success",
      summary: "Welcome!",
      detail: `Hello ${data.user.volunteer_name}`,
      life: 4000,
    });
    router.push("/home");
  } catch (e: unknown) {
    let msg = "Login failed";
    // Optionally, handle Axios errors specifically
    if (axios.isAxiosError(e)) {
      msg = (e.response?.data?.error as string) || msg;
    }
    toast.add({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
}
</script>
