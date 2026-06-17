// ticket-manager/src/services/tickets.ts
import type { Ticket } from "../types/types";

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch("/api/tickets");

  if (!response.ok) {
    throw new Error("Could not fetch tickets");
  }

  return response.json();
}

export async function deleteTicket(id: number): Promise<void> {
  const response = await fetch(`/api/tickets/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete ticket");
  }
}

export async function createTicket(ticket) {
  const response = await fetch(`/api/tickets`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ticket)
  });

  if (!response.ok) {
    throw new Error("Could not create ticket");
  }

  return { success: true}
}