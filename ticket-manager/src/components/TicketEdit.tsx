import { getTicket } from "../services/tickets";
import { useState, useEffect } from "react";
import { updateTicket } from "../services/tickets";

export type TicketEditProps = {
  ticketID: number;
  onDone: () => void;
};

function TicketEdit({ ticketID, onDone }: TicketEditProps) {
  const [id, setID] = useState(ticketID);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");
  const [priority, setPriority] = useState("Low");
  const [username, setUsername] = useState("");
  const [created, setCreated] = useState("");

  useEffect(() => {
    async function loadTicket() {
      const ticket = await getTicket(ticketID);

      setID(ticket.id);
      setTitle(ticket.title);
      setDescription(ticket.description);
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setUsername(ticket.username);
      setCreated(ticket.created);
    }

    loadTicket();
  }, [ticketID]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !username) {
      alert("Title and username are required!");
      return;
    }

    const confirmed = window.confirm("Update this ticket?");

    if (!confirmed) {
      return;
    }

    const newTicket = {
      id,
      title: title,
      description: description,
      status: status,
      priority: priority,
      username: username,
      created: created,
    };

    const resp = await updateTicket(newTicket);

    if (resp) {
      onDone();
    }
  }

  return (
    <>
      <div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            value={description}
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />

          <button type="submit">Update Ticket</button>
        </form>
      </div>
    </>
  );
}

export default TicketEdit;
