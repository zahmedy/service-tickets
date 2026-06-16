import TicketCard from "./TicketCard";
import type { Ticket } from "../types/types";

type TicketCardProps = {
  tickets: Ticket[];
  onDeleteTicket: (id: number) => void;
};

function TicketList({ tickets, onDeleteTicket }: TicketCardProps) {
  return (
    <div>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDeleteTicket={onDeleteTicket}
        />
      ))}
    </div>
  );
}

export default TicketList;
