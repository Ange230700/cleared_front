// src/types/Collection.ts

import type { Volunteer } from "~/src/types/Volunteer";

export interface Waste {
  waste_type: string;
  quantity_kg: number;
}

export interface Collection {
  collection_id: number;
  collection_date: string;
  collection_place: string;
  // for list/detail display:
  volunteers?: Volunteer[];
  wastes?: Waste[];
}

export interface CollectionPayload {
  collection_date: string;
  collection_place: string;
  volunteer_ids: number[];
  wastes: Waste[];
}
