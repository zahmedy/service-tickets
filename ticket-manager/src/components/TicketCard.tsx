import type { Ticket } from "../types/types";

type TicketCardProps = {
  ticket: Ticket;
  onDeleteTicket: (id: number) => void;
};

function TicketCard({ ticket, onDeleteTicket }: TicketCardProps) {
  return (
    <div className="ticket-card">
      <h3 className="ticket-title">Title: {ticket.title}</h3>
      <p className="ticket-description">Description: {ticket.description}</p>
      <p className="ticket-status">Status: {ticket.status}</p>
      <p className="ticket-priority">Priority: {ticket.priority}</p>
      <p className="ticket-username">Username: {ticket.username}</p>
      <p className="ticket-createdAt">Created At: {ticket.created}</p>
      <button className="ticket-edit">Edit</button>
      <button
        onClick={() => onDeleteTicket(ticket.id)}
        className="ticket-delete"
      >
        Delete
      </button>
    </div>
  );
}

export default TicketCard;
