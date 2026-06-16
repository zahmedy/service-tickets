import TicketCard from "./TicketCard";
import type { Ticket } from "../types/types";
import TicketCreate from "./TicketCreate";
import { useState } from "react";

type TicketCardProps = {
  tickets: Ticket[];
  onDeleteTicket: (id: number) => void;
  onEditTicket: (id: number) => void;
};

function TicketList({
  tickets,
  onDeleteTicket,
  onEditTicket,
}: TicketCardProps) {
  const [page, setPage] = useState<"home" | "create">("home");

  if (page === "create") {
    return <TicketCreate />;
  }
  return (
    <div>
      <button onClick={() => setPage("create")}>Create Ticket</button>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDeleteTicket={onDeleteTicket}
          onEditTicket={onEditTicket}
        />
      ))}
    </div>
  );
}

export default TicketList;
