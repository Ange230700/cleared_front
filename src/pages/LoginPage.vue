<!-- src/pages/LoginPage.vue -->

<template>
  <div
    class="min-h-screen bg-surface-50 px-6 py-20 md:px-12 lg:px-20 dark:bg-surface-950"
  >
    <PrimeToast />
    <div
      class="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-2xl bg-surface-0 p-8 shadow-sm md:p-12 dark:bg-surface-900"
    >
      <!-- Logo and Heading -->
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <!-- Logo SVG (replace with your own if desired) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14"
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
              class="fill-surface-700 dark:fill-surface-200"
            />
          </svg>
        </div>
        <div class="flex w-full flex-col items-center gap-2">
          <div
            class="w-full text-center text-2xl leading-tight font-semibold text-surface-900 dark:text-surface-0"
          >
            Welcome Back
          </div>
          <div class="w-full text-center">
            <span class="leading-normal text-surface-700 dark:text-surface-200">
              Don't have an account?
            </span>
            <router-link
              to="/register"
              class="ml-1 cursor-pointer font-medium text-primary hover:text-primary-emphasis"
            >
              Create today!
            </router-link>
          </div>
        </div>
      </div>
      <!-- Form -->
      <PrimeForm @submit="onLogin" class="flex w-full flex-col gap-6">
        <div class="flex w-full flex-col gap-2">
          <label
            for="email"
            class="leading-normal font-medium text-surface-900 dark:text-surface-0"
            >Email Address</label
          >
          <PrimeInputText
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg px-3 py-2 shadow-sm"
            placeholder="Email address"
          />
        </div>
        <div class="flex w-full flex-col gap-2">
          <label
            for="password"
            class="leading-normal font-medium text-surface-900 dark:text-surface-0"
            >Password</label
          >
          <PrimePassword
            id="password"
            v-model="password"
            toggleMask
            required
            autocomplete="current-password"
            class="w-full rounded-lg py-2 shadow-sm"
            placeholder="Password"
          />
        </div>
        <PrimeButton
          label="Sign In"
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-lg py-2"
          :loading="loading"
          icon="pi pi-user"
        >
          <template #icon>
            <i class="pi pi-user !text-base !leading-normal" />
          </template>
        </PrimeButton>
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
