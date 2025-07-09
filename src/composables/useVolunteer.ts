// src/composables/useVolunteer.ts

import { storeToRefs } from "pinia";
import { useVolunteerStore } from "~/src/stores/volunteerStore";

export function useVolunteer() {
  const store = useVolunteerStore();
  const { volunteers, loading, error } = storeToRefs(store);

  return {
    volunteers,
    loading,
    error,
    fetchVolunteers: store.fetchVolunteers,
    createVolunteer: store.createVolunteer,
    updateVolunteer: store.updateVolunteer,
    deleteVolunteer: store.deleteVolunteer,
  };
}
