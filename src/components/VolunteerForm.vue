<!-- src/components/VolunteerForm.vue -->

<template>
  <form @submit.prevent="submit" class="mx-auto max-w-lg">
    <!-- Name -->
    <PrimeFormField label="Name" class="mb-3">
      <input
        v-model="form.volunteer_name"
        type="text"
        class="p-inputtext w-full"
        placeholder="Volunteer name"
        required
        autofocus
      />
    </PrimeFormField>

    <!-- Email -->
    <PrimeFormField label="Email" class="mb-3">
      <input
        v-model="form.volunteer_email"
        type="email"
        class="p-inputtext w-full"
        placeholder="Volunteer email"
        required
      />
    </PrimeFormField>

    <!-- Role -->
    <PrimeFormField label="Role" class="mb-3">
      <select v-model="form.role" class="p-inputtext w-full" required>
        <option :value="undefined" disabled>Select a role</option>
        <option value="admin">Admin</option>
        <option value="attendee">Attendee</option>
      </select>
    </PrimeFormField>

    <!-- Buttons -->
    <div class="mt-4 flex justify-end gap-2">
      <PrimeButton :label="submitLabel || 'Save'" type="submit" class="mr-2" />
      <PrimeButton
        label="Cancel"
        severity="secondary"
        type="button"
        @click="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Volunteer, VolunteerRole } from "~/src/types/Volunteer";

type FormModel = {
  volunteer_name: string;
  volunteer_email: string;
  role: VolunteerRole | undefined;
};

const props = defineProps<{
  initial?: Partial<Volunteer>;
  submitLabel?: string;
}>();
const emit = defineEmits(["submit", "cancel"]);

const form = reactive<FormModel>({
  volunteer_name: props.initial?.volunteer_name || "",
  volunteer_email: props.initial?.volunteer_email || "",
  role: props.initial?.role ?? undefined,
});

watch(
  () => props.initial,
  (val) => {
    form.volunteer_name = val?.volunteer_name || "";
    form.volunteer_email = val?.volunteer_email || "";
    form.role = val?.role ?? undefined;
  },
  { immediate: true },
);

function submit() {
  if (!form.volunteer_email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) || !form.role) {
    alert("Please enter a valid email and select a role.");
    return;
  }
  emit("submit", { ...form });
}
</script>
