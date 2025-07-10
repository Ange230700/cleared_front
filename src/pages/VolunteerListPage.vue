<!-- src/pages/VolunteerListPage.vue -->

<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-4 text-2xl font-bold">Volunteers</h1>
    <PrimeButton
      label="Add Volunteer"
      icon="pi pi-plus"
      @click="goAdd"
      class="mb-4"
    />

    <PrimeDataTable
      :value="volunteerStore.volunteers"
      :loading="volunteerStore.loading"
    >
      <PrimeColumn field="volunteer_name" header="Name" />
      <PrimeColumn field="volunteer_email" header="Email" />
      <PrimeColumn field="role" header="Role" />
      <PrimeColumn header="Actions">
        <template #body="{ data }">
          <PrimeButton
            icon="pi pi-pencil"
            size="small"
            @click="goEdit(data.volunteer_id)"
            class="mr-2"
          />
          <PrimeButton
            icon="pi pi-trash"
            size="small"
            severity="danger"
            @click="deleteVolunteerFn(data.volunteer_id)"
          />
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useVolunteerStore } from "~/src/stores/volunteerStore";

const router = useRouter();
const toast = useToast();
const volunteerStore = useVolunteerStore();

onMounted(volunteerStore.fetchVolunteers);

function goAdd() {
  router.push("/volunteers/add");
}

function goEdit(id: number) {
  router.push(`/volunteers/${id}/edit`);
}

async function deleteVolunteerFn(id: number) {
  if (confirm("Are you sure you want to delete this volunteer?")) {
    try {
      await volunteerStore.deleteVolunteer(id);
      toast.add({
        severity: "success",
        summary: "Volunteer deleted",
      });
    } catch {
      const errorMsg = volunteerStore.error || "Failed to delete volunteer.";
      toast.add({
        severity: "error",
        summary: "Error",
        detail: errorMsg,
      });
    }
  }
}
</script>
