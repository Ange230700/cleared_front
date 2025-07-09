<!-- src/pages/RegisterPage.vue -->

<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-4">
    <PrimeToast />
    <div class="card w-full max-w-md p-6">
      <h2 class="mb-4 text-2xl font-bold">Inscription</h2>
      <PrimeForm @submit="onRegister">
        <PrimeFormField label="Nom complet" name="name" class="mb-3">
          <PrimeInputText v-model="name" required autocomplete="name" />
        </PrimeFormField>
        <PrimeFormField label="Email" name="email" class="mb-3">
          <PrimeInputText
            v-model="email"
            type="email"
            required
            autocomplete="email"
          />
        </PrimeFormField>
        <PrimeFormField label="Mot de passe" name="password" class="mb-3">
          <PrimePassword
            v-model="password"
            toggleMask
            required
            autocomplete="new-password"
          />
        </PrimeFormField>
        <PrimeFormField label="Rôle" name="role" class="mb-4">
          <select v-model="role" class="p-inputtext">
            <option value="attendee">Participant</option>
            <option value="admin">Admin</option>
          </select>
        </PrimeFormField>
        <PrimeButton
          label="Créer un compte"
          type="submit"
          class="mb-2 w-full"
          :loading="loading"
        />
        <div class="mt-2 flex items-center justify-between">
          <router-link to="/login" class="text-primary underline"
            >Déjà un compte ? Se connecter</router-link
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

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("attendee");
const loading = ref(false);
const toast = useToast();
const router = useRouter();

async function onRegister() {
  loading.value = true;
  try {
    await api.post("/api/auth/register", {
      volunteer_name: name.value,
      volunteer_email: email.value,
      password: password.value,
      role: role.value,
    });
    toast.add({
      severity: "success",
      summary: "Compte créé",
      detail: "Veuillez vous connecter",
    });
    router.push("/login");
  } catch (e: unknown) {
    let msg = "Inscription échouée";
    // Optionally, handle Axios errors specifically
    if (axios.isAxiosError(e)) {
      msg = (e.response?.data?.error as string) || msg;
    }
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: msg,
    });
  } finally {
    loading.value = false;
  }
}
</script>
