import type { Ticket } from "../types/types";
import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../services/tickets";
import TicketList from "./TicketList";
import { Link, useNavigate } from "react-router";

export function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Any");
  const [sortBy, setSortBy] = useState("Default");
  const navigate = useNavigate();

  const SearchedTickets = tickets.filter((ticket) => {
    const matchsearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()) ||
      ticket.username.toLowerCase().includes(search.toLowerCase());

    const matchfilter = ticket.status === status || "Any" === status;

    return matchsearch && matchfilter;
  });

  const priorityMap: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const visibleTickets = SearchedTickets.toSorted((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
    if (sortBy === "high-priority") {
      return priorityMap[a.priority] - priorityMap[b.priority];
    }
    if (sortBy === "low-priority") {
      return priorityMap[b.priority] - priorityMap[a.priority];
    }

    return 0;
  });

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
        <select
          onChange={(event) => setSortBy(event.target.value)}
          className="ticket-filter"
        >
          <option value="newest">newest first</option>
          <option value="oldest">oldest first</option>
          <option value="high-priority">high to low priority</option>
          <option value="low-priority">low to high priority</option>
        </select>
        <select
          onChange={(event) => setStatus(event.target.value)}
          className="ticket-filter"
        >
          <option value="Any">Any</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          className="ticket-search"
          type="text"
          placeholder="Search tickets"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <p className="ticket-count">
          {visibleTickets.length}{" "}
          {visibleTickets.length === 1 ? "ticket" : "tickets"}
        </p>
      </div>

      <TicketList
        tickets={visibleTickets}
        onDeleteTicket={handleDeleteTicket}
        onEditTicket={handleEditTicket}
      />
    </section>
  );
}
