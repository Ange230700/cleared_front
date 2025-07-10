<!-- src/pages/CollectionListPage.vue -->

<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-4 text-2xl font-bold">Collections</h1>
    <PrimeButton
      label="Add Collection"
      icon="pi pi-plus"
      @click="goAdd"
      class="mb-4"
    />
    <PrimeDataTable :value="collections" :loading="loading">
      <PrimeColumn field="collection_date" header="Date" />
      <PrimeColumn field="collection_place" header="Place" />
      <PrimeColumn header="Actions">
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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCollectionStore } from "~/src/stores/collectionStore";
const router = useRouter();
const { collections, fetchCollections, loading } = useCollectionStore();

onMounted(fetchCollections);

function goAdd() {
  router.push("/collections/add");
}

function goEdit(id: number) {
  router.push(`/collections/${id}/edit`);
}
</script>
