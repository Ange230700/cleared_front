// src/types/Collection.ts

import type { Volunteer } from "~/src/types/Volunteer";
import type { Garbage } from "~/src/types/Garbage";

export interface Collection {
  collection_id: number;
  collection_date: string;
  collection_place: string;
  // for list/detail display:
  volunteers?: Volunteer[];
  garbages?: Garbage[];
}

export interface CollectionPayload {
  collection_date: string;
  collection_place: string;
  volunteer_ids: number[];
  garbages: Garbage[];
}
