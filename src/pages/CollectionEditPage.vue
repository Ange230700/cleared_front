<!-- src/pages/CollectionEditPage.vue -->

<template>
  <CollectionForm
    :initial="collection"
    :volunteers="volunteers"
    :submitLabel="'Save Changes'"
    @submit="handleSubmit"
    @cancel="goBack"
    v-if="collection"
  />
  <PrimeProgressSpinner v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import CollectionForm from "~/src/components/CollectionForm.vue";
import { useVolunteerStore } from "~/src/stores/volunteerStore";
import { useCollectionStore } from "~/src/stores/collectionStore";
import type { Collection, CollectionPayload } from "~/src/types/Collection";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { fetchVolunteers, volunteers } = useVolunteerStore();
const collectionStore = useCollectionStore();

const collection = ref<Collection | null>(null);

onMounted(async () => {
  await fetchVolunteers();
  await collectionStore.fetchCollections();
  collection.value =
    collectionStore.collections.find(
      (c: Collection) => c.collection_id === Number(route.params.id),
    ) || null;
});

async function handleSubmit(data: CollectionPayload) {
  if (!collection.value) return;
  try {
    await collectionStore.updateCollection(
      collection.value.collection_id,
      data,
    );
    toast.add({ severity: "success", summary: "Collection updated" });
    router.push("/collections");
  } catch {
    const errorMsg = collectionStore.error || "Failed to update collection.";
    toast.add({ severity: "error", summary: "Error", detail: errorMsg });
  }
}

function goBack() {
  router.push("/collections");
}
</script>
