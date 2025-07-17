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

function goAdd() {
  router.push("/collections/add");
}

function goEdit(id: number) {
  router.push(`/collections/${id}/edit`);
}
</script>
