<!-- src/pages/VolunteerEditPage.vue -->

<template>
  <VolunteerForm
    :initial="volunteer"
    :submitLabel="'Save Changes'"
    @submit="handleSubmit"
    @cancel="goBack"
    v-if="volunteer"
  />
  <PrimeProgressSpinner v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import VolunteerForm from "~/src/components/VolunteerForm.vue";
import { useVolunteerStore } from "~/src/stores/volunteerStore";
import type { VolunteerEditPayload, Volunteer } from "~/src/types/Volunteer";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const volunteerStore = useVolunteerStore();

const volunteer = ref<Volunteer | null>(null);

onMounted(async () => {
  await volunteerStore.fetchVolunteers();
  volunteer.value =
    volunteerStore.volunteers.find(
      (v: Volunteer) => v.volunteer_id === Number(route.params.id),
    ) || null;
});

async function handleSubmit(data: VolunteerEditPayload) {
  if (!volunteer.value) return;
  try {
    await volunteerStore.updateVolunteer(volunteer.value.volunteer_id, data);
    toast.add({ severity: "success", summary: "Volunteer updated" });
    router.push("/volunteers");
  } catch {
    const errorMsg = volunteerStore.error || "Failed to update volunteer.";
    toast.add({ severity: "error", summary: "Error", detail: errorMsg });
  }
}

function goBack() {
  router.push("/volunteers");
}
</script>
