// src/stores/collectionStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Collection } from "~/src/types/Collection";
import api from "~/src/axios-instance";

export const useCollectionStore = defineStore("collection", () => {
  const collections = ref<Collection[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all collections
  async function fetchCollections() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get<Collection[]>("/api/collections");
      collections.value = res.data;
    } catch (err: unknown) {
      let msg = "Error loading collections";
      // Optionally, handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data?.error as string) || msg;
      }
      error.value = msg;
    } finally {
      loading.value = false;
    }
  }

  // CRUD
  async function createCollection(payload: Omit<Collection, "collection_id">) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post<Collection>("/api/collections", payload);
      collections.value.push(res.data);
      return res.data;
    } catch (err: unknown) {
      let msg = "Error creating collection";
      // Optionally, handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data?.error as string) || msg;
      }
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateCollection(
    id: number,
    payload: Partial<Omit<Collection, "collection_id">>,
  ) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.put<Collection>(`/api/collections/${id}`, payload);
      const idx = collections.value.findIndex((c) => c.collection_id === id);
      if (idx !== -1) collections.value[idx] = res.data;
      return res.data;
    } catch (err: unknown) {
      let msg = "Error updating collection";
      // Optionally, handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data?.error as string) || msg;
      }
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCollection(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/api/collections/${id}`);
      collections.value = collections.value.filter(
        (c) => c.collection_id !== id,
      );
    } catch (err: unknown) {
      let msg = "Error deleting collection";
      // Optionally, handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data?.error as string) || msg;
      }
      error.value = msg;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    collections,
    loading,
    error,
    fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
  };
});
