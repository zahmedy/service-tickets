// ticket-manager/src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import TicketList from "./components/TicketList";
import type { Ticket } from "./types/types";
import { getTickets, deleteTicket } from "./services/tickets";

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

  return <TicketList tickets={tickets} onDeleteTicket={handleDeleteTicket} />;
}

export default App;
