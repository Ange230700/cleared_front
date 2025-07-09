<!-- src/components/VolunteerTable.vue -->
<template>
  <div>
    <PrimeButton label="Ajouter un bénévole" class="mb-4" @click="onAdd" />
    <PrimeDataTable :value="volunteers" :loading="loading">
      <PrimeColumn field="volunteer_id" header="ID" />
      <PrimeColumn field="volunteer_name" header="Nom" />
      <PrimeColumn field="volunteer_email" header="Email" />
      <PrimeColumn field="role" header="Rôle" />
      <PrimeColumn header="Actions">
        <template #body="{ data }">
          <PrimeButton icon="pi pi-pencil" @click="onEdit(data)" />
          <PrimeButton
            icon="pi pi-trash"
            class="ml-2"
            severity="danger"
            @click="onDelete(data)"
          />
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Volunteer } from "~/src/types/Volunteer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  volunteers: Volunteer[];
  loading: boolean;
}>();

const emit = defineEmits(["add", "edit", "delete"]);

function onAdd() {
  emit("add");
}
function onEdit(vol: Volunteer) {
  emit("edit", vol);
}
function onDelete(vol: Volunteer) {
  emit("delete", vol);
}
</script>
