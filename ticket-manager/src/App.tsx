// ticket-manager/src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import TicketList from "./components/TicketList";
import type { Ticket } from "./types/types";
import { getTickets, deleteTicket } from "./services/tickets";
import Home from "./components/Home";
import TicketCreate from "./components/TicketCreate";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
    try {
      await deleteTicket(id);

      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditTicket() {
    console.log("editing");
  }

  const [page, setPage] = useState<"home" | "tickets" | "create">("home");

  return (
    <div>
      <Home onOpenTickets={() => setPage("tickets")} />
      <button onClick={() => setPage("create")}>Create Ticket</button>
      {page === "tickets" && (
        <TicketList
          tickets={tickets}
          onDeleteTicket={handleDeleteTicket}
          onEditTicket={handleEditTicket}
        />
      )}
      {page === "create" && <TicketCreate />}
    </div>
  );
}

export default App;
