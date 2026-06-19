import type { Ticket } from "../types/types";
import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../services/tickets";
import TicketList from "./TicketList";
import { Link, Route } from "react-router";
import TicketEdit from "./TicketEdit";

export function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketId, setTicketId] = useState(0);
  const [search, setSearch] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()) ||
      ticket.username.toLowerCase().includes(search.toLowerCase()),
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
    const confirmed = window.confirm("Delte this ticket?");

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

  async function handleEditTicket(id: number) {
    <Route
      path="/ticket/id/edit"
      element={
        <TicketEdit ticketID={ticketId} onDone={() => console.log("Done")} />
      }
    />;
    setTicketId(id);
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
