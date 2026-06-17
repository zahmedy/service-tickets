import TicketCard from "./TicketCard";
import type { Ticket } from "../types/types";

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
  return (
    <div>
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
