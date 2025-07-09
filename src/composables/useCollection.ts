// src/composables/useCollection.ts

import { storeToRefs } from "pinia";
import { useCollectionStore } from "~/src/stores/collectionStore";

export function useCollection() {
  const store = useCollectionStore();
  const { collections, loading, error } = storeToRefs(store);
  return {
    collections,
    loading,
    error,
    fetchCollections: store.fetchCollections,
    createCollection: store.createCollection,
    updateCollection: store.updateCollection,
    deleteCollection: store.deleteCollection,
  };
}
