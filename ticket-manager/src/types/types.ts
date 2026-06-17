export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  username: string;
  created: string;
};

export type CreateTicketInput = Omit<Ticket, "id" | "created">;