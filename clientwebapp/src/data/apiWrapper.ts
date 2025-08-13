import type { Vacation } from "../domain/Vacation";
import type { Country } from "../domain/Country";
import type { Destination } from "../domain/Destination";
import type { Booking } from "../domain/Booking";
import type { DestinationVacation } from "../domain/DestinationVacation";

const API_BASE = "http://localhost:3000"; 

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // ---------------------------
  // VACATIONS
  // ---------------------------
  vacations: {
    getAll: () => apiFetch<Vacation[]>(`${API_BASE}/vacations`),
    getById: (id: number) => apiFetch<Vacation>(`${API_BASE}/vacations/${id}`),
    create: (data: Pick<Vacation, "name" | "description">) =>
      apiFetch(`${API_BASE}/vacations`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Pick<Vacation, "name" | "description">) =>
      apiFetch(`${API_BASE}/vacations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiFetch(`${API_BASE}/vacations/${id}`, { method: "DELETE" }),
  },

  // ---------------------------
  // COUNTRIES
  // ---------------------------
  countries: {
    getAll: () => apiFetch<Country[]>(`${API_BASE}/countries`),
    getById: (id: number) => apiFetch<Country>(`${API_BASE}/countries/${id}`),
    create: (data: Pick<Country, "name" | "is_in_eu">) =>
      apiFetch(`${API_BASE}/countries`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Pick<Country, "name" | "is_in_eu">) =>
      apiFetch(`${API_BASE}/countries/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiFetch(`${API_BASE}/countries/${id}`, { method: "DELETE" }),
  },

  // ---------------------------
  // DESTINATIONS
  // ---------------------------
  destinations: {
    getAll: () => apiFetch<Destination[]>(`${API_BASE}/destinations`),
    getById: (id: number) =>
      apiFetch<Destination>(`${API_BASE}/destinations/${id}`),
    create: (
      data: Pick<
        Destination,
        "name" | "description" | "country_id" | "latitude" | "longitude"
      >
    ) =>
      apiFetch(`${API_BASE}/destinations`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (
      id: number,
      data: Pick<
        Destination,
        "name" | "description" | "country_id" | "latitude" | "longitude"
      >
    ) =>
      apiFetch(`${API_BASE}/destinations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiFetch(`${API_BASE}/destinations/${id}`, { method: "DELETE" }),
  },

  // ---------------------------
  // BOOKINGS
  // ---------------------------
  bookings: {
    getAll: () => apiFetch<Booking[]>(`${API_BASE}/bookings`),
    getById: (id: number) => apiFetch<Booking>(`${API_BASE}/bookings/${id}`),
    create: (
      data: Pick<Booking, "vacation_id" | "first_name" | "last_name" | "email">
    ) =>
      apiFetch(`${API_BASE}/bookings`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (
      id: number,
      data: Pick<
        Booking,
        "vacation_id" | "first_name" | "last_name" | "email"
      >
    ) =>
      apiFetch(`${API_BASE}/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiFetch(`${API_BASE}/bookings/${id}`, { method: "DELETE" }),
  },

  // ---------------------------
  // DESTINATION_VACATION
  // ---------------------------
  destinationVacations: {
    getAll: () =>
      apiFetch<DestinationVacation[]>(`${API_BASE}/destination_vacations`),
    getById: (id: number) =>
      apiFetch<DestinationVacation>(`${API_BASE}/destination_vacations/${id}`),
    create: (
      data: Pick<DestinationVacation, "destination_id" | "vacation_id" | "description">
    ) =>
      apiFetch(`${API_BASE}/destination_vacations`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (
      id: number,
      data: Pick<DestinationVacation, "destination_id" | "vacation_id" | "description">
    ) =>
      apiFetch(`${API_BASE}/destination_vacations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiFetch(`${API_BASE}/destination_vacations/${id}`, { method: "DELETE" }),
  },
};