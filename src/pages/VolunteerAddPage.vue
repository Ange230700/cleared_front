<!-- src/pages/VolunteerAddPage.vue -->

<template>
  <VolunteerForm
    :submitLabel="'Add Volunteer'"
    @submit="handleSubmit"
    @cancel="goBack"
  />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import VolunteerForm from "~/src/components/VolunteerForm.vue";
import { useVolunteerStore } from "~/src/stores/volunteerStore";
import type { VolunteerPayload } from "~/src/types/Volunteer";

const router = useRouter();
const toast = useToast();
const volunteerStore = useVolunteerStore();

async function handleSubmit(data: VolunteerPayload) {
  try {
    await volunteerStore.createVolunteer(data);
    toast.add({ life: 4000, severity: "success", summary: "Volunteer added" });
    router.push("/volunteers");
  } catch {
    const errorMsg = volunteerStore.error || "Failed to add volunteer.";
    toast.add({
      life: 4000,
      severity: "error",
      summary: "Error",
      detail: errorMsg,
    });
  }
}

function goBack() {
  router.push("/volunteers");
}
</script>
