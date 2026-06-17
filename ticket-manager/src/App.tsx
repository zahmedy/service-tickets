// ticket-manager/src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import TicketList from "./components/TicketList";
import type { Ticket } from "./types/types";
import { getTickets, deleteTicket } from "./services/tickets";
import Home from "./components/Home";
import TicketCreate from "./components/TicketCreate";
import TicketEdit from "./components/TicketEdit";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketId, setTicketId] = useState(0);
  const [page, setPage] = useState<"home" | "tickets" | "create" | "edit">(
    "tickets",
  );
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
    setTicketId(id);
    setPage("edit");
  }

  async function refreshTickets() {
    const tickets = await getTickets();
    setTickets(tickets);
  }

  return (
    <div>
      <Home onOpenTickets={() => setPage("tickets")} />
      <div className="ticket-toolbar">
        <input
          className="ticket-search"
          type="text"
          placeholder="Search tickets"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={() => setPage("create")}>Create Ticket</button>
      </div>
      {page === "tickets" && (
        <TicketList
          tickets={filteredTickets}
          onDeleteTicket={handleDeleteTicket}
          onEditTicket={handleEditTicket}
        />
      )}
      {page === "create" && (
        <TicketCreate
          onDone={async () => {
            await refreshTickets();
            setPage("tickets");
          }}
        />
      )}
      {page === "edit" && (
        <TicketEdit
          ticketID={ticketId}
          onDone={async () => {
            await refreshTickets();
            setPage("tickets");
          }}
        />
      )}
    </div>
  );
}

export default App;
