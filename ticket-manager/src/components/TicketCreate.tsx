import { useState } from "react";

function TicketCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");
  const [priority, setPriority] = useState("Low");
  const [username, setUsername] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTicket = {
      title,
      description,
      status,
      priority,
      username,
    };

    console.log("create ticket", newTicket);
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

          <button type="submit">Create Ticket</button>
        </form>
      </div>
    </>
  );
}

export default TicketCreate;
