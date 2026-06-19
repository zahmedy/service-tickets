import TicketCard from "./TicketCard";
import type { Ticket } from "../types/types";

type TicketListProps = {
  tickets: Ticket[];
  onDeleteTicket: (id: number) => void;
  onEditTicket: (id: number) => void;
};

function TicketList({
  tickets,
  onDeleteTicket,
  onEditTicket,
}: TicketListProps) {
  return (
    <div className="ticket-list">
      {tickets.length === 0 && (
        <div className="ticket-empty">No tickets match your search.</div>
      )}
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
