import TicketCard from "./TicketCard";

function TicketList({ tickets, onDeleteTicket }) {
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