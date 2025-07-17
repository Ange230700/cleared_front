<!-- src/pages/CollectionListPage.vue -->

<template>
  <div class="container mx-auto flex-1 p-8">
    <PrimeToast />
    <h1 class="mb-4 text-2xl font-bold">Collections</h1>
    <PrimeButton
      v-if="userStore.role === 'admin'"
      label="Add Collection"
      icon="pi pi-plus"
      @click="goAdd"
      class="mb-4"
    />
    <PrimeDataTable
      :value="collectionStore.collections"
      :loading="collectionStore.loading"
    >
      <PrimeColumn field="collection_date" header="Date" />
      <PrimeColumn field="collection_place" header="Place" />
      <PrimeColumn header="Volunteers">
        <template #body="{ data }">
          {{ volunteerNames(data.volunteers) }}
        </template>
      </PrimeColumn>
      <PrimeColumn header="Garbage Collected">
        <template #body="{ data }">
          {{ garbageInfo(data.garbages) }}
        </template>
      </PrimeColumn>

      <PrimeColumn v-if="userStore.role === 'admin'" header="Actions">
        <template #body="{ data }">
          <PrimeButton
            icon="pi pi-pencil"
            size="small"
            @click="goEdit(data.collection_id)"
            class="mr-2"
          />
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCollectionStore } from "~/src/stores/collectionStore";
import { useUserStore } from "~/src/stores/userStore";
import { useToast } from "primevue/usetoast";
import type { Volunteer } from "~/src/types/Volunteer";
import type { Garbage } from "~/src/types/Garbage";

const router = useRouter();
const collectionStore = useCollectionStore();
const userStore = useUserStore();
const toast = useToast();

onMounted(collectionStore.fetchCollections);

watch(
  () => collectionStore.error,
  (newError) => {
    if (newError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: newError,
        life: 4000,
      });
    }
  },
);

function volunteerNames(volunteers?: Volunteer[]): string {
  return volunteers && volunteers.length
    ? volunteers.map((v) => v.volunteer_name).join(", ")
    : "No volunteers";
}

function garbageInfo(garbages?: Garbage[]): string {
  return garbages && garbages.length
    ? garbages.map((g) => `${g.garbage_type}: ${g.quantity_kg}kg`).join(", ")
    : "No garbage";
}

function goAdd() {
  router.push("/collections/add");
}

function goEdit(id: number) {
  router.push(`/collections/${id}/edit`);
}
</script>
