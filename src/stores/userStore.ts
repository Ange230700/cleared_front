// src/stores/userStore.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Volunteer } from "~/src/types/Volunteer";

export const useUserStore = defineStore("user", () => {
  // State: the currently authenticated user (null if not logged in)
  const user = ref<Volunteer | null>(null);

  // Action: set user data after login or refresh
  function setUser(userData: Volunteer) {
    user.value = userData;
  }

  // Action: clear user data on logout
  function clearUser() {
    user.value = null;
  }

  // Getter: true if logged in
  const isLoggedIn = computed(() => !!user.value);

  // Getter: current user's role (or null)
  const role = computed(() => user.value?.role ?? null);

  // Getter: current user's name (or empty string)
  const name = computed(() => user.value?.volunteer_name ?? "");

  // Getter: current user's id (or null)
  const id = computed(() => user.value?.volunteer_id ?? null);

  return {
    user,
    setUser,
    clearUser,
    isLoggedIn,
    role,
    name,
    id,
  };
});
