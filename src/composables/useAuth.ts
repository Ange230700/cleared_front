// src/composables/useAuth.ts

import { ref } from "vue";
import { useUserStore } from "~/src/stores/userStore";
import api from "~/src/axios-instance";

const isAuthenticated = ref(false);
const bootstrapped = ref(false);

export function useAuth() {
  const userStore = useUserStore();

  async function fetchAuth() {
    try {
      const response = await api.post(
        `/api/auth/refresh`,
        {},
        {
          withCredentials: true,
        },
      );

      const { user } = response.data;
      if (user) {
        userStore.setUser(user);
        isAuthenticated.value = true;
      } else {
        throw new Error("No user returned");
      }
    } catch {
      isAuthenticated.value = false;
      userStore.clearUser();
    } finally {
      bootstrapped.value = true;
    }
    return isAuthenticated.value;
  }

  function setAuthenticated(val: boolean) {
    isAuthenticated.value = val;
  }

  return { isAuthenticated, bootstrapped, fetchAuth, setAuthenticated };
}
