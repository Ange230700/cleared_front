<!-- src/components/CollectionForm.vue -->

<template>
  <form @submit.prevent="submit">
    <!-- Date -->
    <PrimeFormField label="Date" class="mb-3">
      <input
        v-model="form.collection_date"
        type="date"
        class="p-inputtext"
        required
      />
    </PrimeFormField>

    <!-- Lieu -->
    <PrimeFormField label="Lieu" class="mb-3">
      <input
        v-model="form.collection_place"
        type="text"
        class="p-inputtext"
        required
      />
    </PrimeFormField>

    <!-- Volunteers (Checkbox list) -->
    <PrimeFormField label="Bénévoles" class="mb-3">
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="vol in volunteers"
          :key="vol.volunteer_id"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="vol.volunteer_id"
            v-model="form.volunteer_ids"
            class="accent-primary"
          />
          {{ vol.volunteer_name }}
        </label>
      </div>
    </PrimeFormField>

    <!-- Wastes (dynamic) -->
    <PrimeFormField label="Déchets collectés" class="mb-3">
      <div
        v-for="(waste, idx) in form.garbages"
        :key="idx"
        class="mb-2 flex items-center gap-2"
      >
        <input
          v-model="waste.garbage_type"
          type="text"
          placeholder="Type de déchet"
          class="p-inputtext"
          required
        />
        <input
          v-model.number="waste.quantity_kg"
          type="number"
          min="0"
          step="0.1"
          placeholder="Quantité (kg)"
          class="p-inputtext"
          required
        />
        <PrimeButton
          icon="pi pi-trash"
          severity="danger"
          @click="removeWaste(idx)"
          type="button"
          v-if="form.garbages.length > 1"
        />
      </div>
      <PrimeButton
        label="Ajouter un déchet"
        type="button"
        @click="addWaste"
        size="small"
        class="mt-2"
      />
    </PrimeFormField>

    <!-- Buttons -->
    <div class="mt-4 flex justify-end gap-2">
      <PrimeButton
        :label="submitLabel || 'Enregistrer'"
        type="submit"
        class="mr-2"
      />
      <PrimeButton
        label="Annuler"
        severity="secondary"
        type="button"
        @click="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Volunteer } from "~/src/types/Volunteer";
import type { Garbage } from "~/src/types/Garbage";
import type { Collection } from "~/src/types/Collection";

type WasteForm = { garbage_type: string; quantity_kg: number | null };
type CollectionFormModel = {
  collection_date: string;
  collection_place: string;
  volunteer_ids: number[];
  garbages: WasteForm[];
};

const props = defineProps<{
  initial?: Partial<
    Collection & { volunteer_ids?: number[]; garbages?: WasteForm[] }
  >;
  volunteers: Volunteer[];
  submitLabel?: string;
}>();
const emit = defineEmits(["submit", "cancel"]);

const form = reactive<CollectionFormModel>({
  collection_date: props.initial?.collection_date || "",
  collection_place: props.initial?.collection_place || "",
  volunteer_ids: props.initial?.volunteer_ids || [],
  garbages: props.initial?.garbages?.map((w) => ({
    garbage_type: w.garbage_type ?? "",
    quantity_kg: w.quantity_kg ?? null,
  })) || [{ garbage_type: "", quantity_kg: null }],
});

function addWaste() {
  form.garbages.push({ garbage_type: "", quantity_kg: null });
}

function removeWaste(idx: number) {
  form.garbages.splice(idx, 1);
}

function submit() {
  const validWastes: Garbage[] = form.garbages
    .filter(
      (w) =>
        w.garbage_type.trim() &&
        w.quantity_kg != null &&
        !isNaN(w.quantity_kg) &&
        w.quantity_kg > 0,
    )
    .map((w) => ({
      garbage_type: w.garbage_type,
      quantity_kg: w.quantity_kg ?? 0,
    }));

  emit("submit", {
    ...form,
    garbages: validWastes,
  });
}

watch(
  () => props.initial,
  (val) => {
    if (val) {
      form.collection_date = val.collection_date || "";
      form.collection_place = val.collection_place || "";
      form.volunteer_ids = val.volunteer_ids || [];
      form.garbages = val.garbages?.map((w) => ({
        garbage_type: w.garbage_type ?? "",
        quantity_kg: w.quantity_kg ?? null,
      })) || [{ garbage_type: "", quantity_kg: null }];
    }
  },
  { immediate: true },
);
</script>
