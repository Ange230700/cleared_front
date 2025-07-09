<!-- src\pages\CollectionAddPage.vue -->

<template>
  <CollectionForm
    :volunteers="volunteers"
    :submitLabel="'Ajouter la collecte'"
    @submit="handleSubmit"
    @cancel="goBack"
  />
</template>

<script setup lang="ts">
import CollectionForm from "~/src/components/CollectionForm.vue";
import { useVolunteerStore } from "~/src/stores/volunteerStore";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, onMounted } from "vue";

const { volunteers, fetchVolunteers } = useVolunteerStore();
onMounted(fetchVolunteers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleSubmit(data: unknown) {
  // Call store.createCollection(data), show toast, navigate
}
function goBack() {
  // router.push(...)
}
</script>
