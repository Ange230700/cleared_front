// src/composables/useAuth.ts
import { ref } from "vue";
import { useUserStore } from "~/src/stores/userStore";
import axios from "axios";

const isAuthenticated = ref(false);
const bootstrapped = ref(false);

export function useAuth() {
  const userStore = useUserStore();

  async function fetchAuth() {
    try {
      const response = await axios.get(`/api/auth/refresh`, {
        withCredentials: true,
      });
      const payload = response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userData = payload.data;
      userStore.setUser();
      isAuthenticated.value = true;
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
