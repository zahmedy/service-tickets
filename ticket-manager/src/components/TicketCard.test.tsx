// src/components/TicketCard.test.tsx
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach } from "vitest";
import TicketCard from "./TicketCard";
// src/setupTests.ts
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

const ticket = {
  id: 1,
  title: "Printer is broken",
  description: "The office printer is jammed",
  status: "New",
  priority: "High",
  username: "zayed",
  created: "2026-06-19",
};

describe("TicketCard", () => {
  it("renders ticket information", () => {
    render(
      <TicketCard
        ticket={ticket}
        onDeleteTicket={() => {}}
        onEditTicket={() => {}}
      />,
    );

    expect(screen.getByText("Title: Printer is broken")).toBeInTheDocument();
    expect(
      screen.getByText("Description: The office printer is jammed"),
    ).toBeInTheDocument();
    expect(screen.getByText("Status: New")).toBeInTheDocument();
    expect(screen.getByText("Priority: High")).toBeInTheDocument();
    expect(screen.getByText("Username: zayed")).toBeInTheDocument();
  });

  it("calls onEditTicket with the ticket id when Edit is clicked", async () => {
    const user = userEvent.setup();
    const onEditTicket = vi.fn();

    render(
      <TicketCard
        ticket={ticket}
        onDeleteTicket={() => {}}
        onEditTicket={onEditTicket}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Edit" }));

    expect(onEditTicket).toHaveBeenCalledWith(1);
  });

  it("calls onDeleteTicket with the ticket id when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onDeleteTicket = vi.fn();

    render(
      <TicketCard
        ticket={ticket}
        onDeleteTicket={onDeleteTicket}
        onEditTicket={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDeleteTicket).toHaveBeenCalledWith(1);
  });
});
