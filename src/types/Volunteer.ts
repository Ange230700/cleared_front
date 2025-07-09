// src/types/Volunteer.ts

export type VolunteerRole = "admin" | "attendee";

export interface Volunteer {
  volunteer_id: number;
  volunteer_name: string;
  volunteer_email: string;
  role: VolunteerRole;
  // Optionally add more fields as needed
}

export interface VolunteerPayload {
  volunteer_name: string;
  volunteer_email: string;
  password?: string; // required for create, optional for edit
  role?: VolunteerRole;
}

export interface VolunteerEditPayload {
  volunteer_name?: string;
  volunteer_email?: string;
  password?: string;
  role?: VolunteerRole;
}
