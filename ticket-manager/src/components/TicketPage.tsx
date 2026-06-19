import type { Ticket } from "../types/types";
import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../services/tickets";
import TicketList from "./TicketList";
import { Link, useNavigate } from "react-router";

export function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const lowerSearch = search.toLowerCase();
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(lowerSearch) ||
      ticket.description.toLowerCase().includes(lowerSearch) ||
      ticket.username.toLowerCase().includes(lowerSearch),
  );

  useEffect(() => {
    async function loadTickets() {
      try {
        const tickets = await getTickets();
        setTickets(tickets);
      } catch (error) {
        console.error(error);
      }
    }

    loadTickets();
  }, []);

  async function handleDeleteTicket(id: number) {
    const confirmed = window.confirm("Delete this ticket?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteTicket(id);

      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditTicket(id: number) {
    navigate(`/tickets/${id}/edit`);
  }
  return (
    <section className="ticket-page">
      <div className="ticket-page-header">
        <div>
          <p className="ticket-eyebrow">Service desk</p>
          <h1>Tickets</h1>
        </div>
        <Link to="/create" className="ticket-create-link">
          Create Ticket
        </Link>
      </div>

      <div className="ticket-toolbar">
        <input
          className="ticket-search"
          type="text"
          placeholder="Search tickets"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <p className="ticket-count">
          {filteredTickets.length}{" "}
          {filteredTickets.length === 1 ? "ticket" : "tickets"}
        </p>
      </div>

      <TicketList
        tickets={filteredTickets}
        onDeleteTicket={handleDeleteTicket}
        onEditTicket={handleEditTicket}
      />
    </section>
  );
}
