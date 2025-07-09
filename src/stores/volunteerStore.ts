// src/stores/volunteerStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Volunteer,
  VolunteerPayload,
  VolunteerEditPayload,
} from "~/src/types/Volunteer";
import api from "~/src/axios-instance";

export const useVolunteerStore = defineStore("volunteer", () => {
  const volunteers = ref<Volunteer[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchVolunteers() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get<Volunteer[]>("/api/volunteers");
      volunteers.value = res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message ?? "Erreur de chargement des bénévoles";
    } finally {
      loading.value = false;
    }
  }

  async function createVolunteer(payload: VolunteerPayload) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post<Volunteer>("/api/volunteers", payload);
      volunteers.value.push(res.data);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message ?? "Erreur lors de la création du bénévole";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateVolunteer(id: number, payload: VolunteerEditPayload) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.put<Volunteer>(`/api/volunteers/${id}`, payload);
      const idx = volunteers.value.findIndex((v) => v.volunteer_id === id);
      if (idx !== -1) volunteers.value[idx] = res.data;
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message ?? "Erreur lors de la modification";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteVolunteer(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/api/volunteers/${id}`);
      volunteers.value = volunteers.value.filter((v) => v.volunteer_id !== id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message ?? "Erreur lors de la suppression";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    volunteers,
    loading,
    error,
    fetchVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
  };
});
