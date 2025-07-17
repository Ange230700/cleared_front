// src/stores/volunteerStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type {
  Volunteer,
  VolunteerPayload,
  VolunteerEditPayload,
} from "~/src/types/Volunteer";
import api from "~/src/axios-instance";
import type { ApiResponse } from "~/src/types/ApiResponse";
import { unwrapApiResponse } from "~/src/helpers/unwrapApiResponse";

export const useVolunteerStore = defineStore("volunteer", () => {
  const volunteers = ref<Volunteer[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchVolunteers() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get<ApiResponse<Volunteer[]>>("/api/volunteers");
      volunteers.value = unwrapApiResponse(res.data);
    } catch (err: unknown) {
      let msg = "Error loading volunteers";
      // Optionally, handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        msg = (err.response?.data?.error as string) || msg;
      }
      error.value = msg;
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
    } catch (err: unknown) {
      let msg = "Error creating volunteer";
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

  async function updateVolunteer(id: number, payload: VolunteerEditPayload) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.put<Volunteer>(`/api/volunteers/${id}`, payload);
      const idx = volunteers.value.findIndex((v) => v.volunteer_id === id);
      if (idx !== -1) volunteers.value[idx] = res.data;
      return res.data;
    } catch (err: unknown) {
      let msg = "Error updating volunteer";
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

  async function deleteVolunteer(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/api/volunteers/${id}`);
      volunteers.value = volunteers.value.filter((v) => v.volunteer_id !== id);
    } catch (err: unknown) {
      let msg = "Error deleting volunteer";
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
    volunteers,
    loading,
    error,
    fetchVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
  };
});
