<!-- src/pages/CollectionAddPage.vue -->

<template>
  <CollectionForm
    :volunteers="volunteers"
    :submitLabel="'Add Collection'"
    @submit="handleSubmit"
    @cancel="goBack"
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import CollectionForm from "~/src/components/CollectionForm.vue";
import { useVolunteerStore } from "~/src/stores/volunteerStore";
import { useCollectionStore } from "~/src/stores/collectionStore";
import type { CollectionPayload } from "~/src/types/Collection";

const { volunteers, fetchVolunteers } = useVolunteerStore();
const collectionStore = useCollectionStore();
const router = useRouter();
const toast = useToast();

onMounted(fetchVolunteers);

async function handleSubmit(data: CollectionPayload) {
  try {
    await collectionStore.createCollection(data);
    toast.add({
      severity: "success",
      summary: "Collection added",
      detail: "The collection has been successfully created.",
    });
    router.push("/collections");
  } catch (err: unknown) {
    let msg = "Error adding collection";
    // Optionally, handle Axios errors specifically
    if (axios.isAxiosError(err)) {
      msg = (err.response?.data?.error as string) || msg;
    }
    toast.add({
      severity: "error",
      summary: "Error",
      detail: collectionStore.error || msg,
    });
  }
}

function goBack() {
  router.push("/collections");
}
</script>
