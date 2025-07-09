<!-- src/components/CollectionForm.vue -->
<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Volunteer } from "~/src/types/Volunteer";
import type { Waste } from "~/src/types/Waste";
import type { Collection } from "~/src/types/Collection";

type WasteForm = { waste_type: string; quantity_kg: number | null };
type CollectionFormModel = {
  collection_date: string;
  collection_place: string;
  volunteer_ids: number[];
  wastes: WasteForm[];
};

const props = defineProps<{
  initial?: Partial<
    Collection & { volunteer_ids?: number[]; wastes?: WasteForm[] }
  >;
  volunteers: Volunteer[];
  submitLabel?: string;
}>();
const emit = defineEmits(["submit", "cancel"]);

const form = reactive<CollectionFormModel>({
  collection_date: props.initial?.collection_date || "",
  collection_place: props.initial?.collection_place || "",
  volunteer_ids: props.initial?.volunteer_ids || [],
  wastes: props.initial?.wastes?.map((w) => ({
    waste_type: w.waste_type ?? "",
    quantity_kg: w.quantity_kg ?? null,
  })) || [{ waste_type: "", quantity_kg: null }],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function addWaste() {
  form.wastes.push({ waste_type: "", quantity_kg: null });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function removeWaste(idx: number) {
  form.wastes.splice(idx, 1);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function submit() {
  const validWastes: Waste[] = form.wastes
    .filter(
      (w) =>
        w.waste_type.trim() &&
        w.quantity_kg != null &&
        !isNaN(w.quantity_kg) &&
        w.quantity_kg > 0,
    )
    .map((w) => ({
      waste_type: w.waste_type,
      quantity_kg: w.quantity_kg ?? 0,
    }));

  emit("submit", {
    ...form,
    wastes: validWastes,
  });
}

watch(
  () => props.initial,
  (val) => {
    if (val) {
      form.collection_date = val.collection_date || "";
      form.collection_place = val.collection_place || "";
      form.volunteer_ids = val.volunteer_ids || [];
      form.wastes = val.wastes?.map((w) => ({
        waste_type: w.waste_type ?? "",
        quantity_kg: w.quantity_kg ?? null,
      })) || [{ waste_type: "", quantity_kg: null }];
    }
  },
  { immediate: true },
);
</script>
