// ticket-manager/src/App.tsx
import { Link, Routes, Route, useNavigate } from "react-router";
import "./App.css";
import TicketCreate from "./components/TicketCreate";
import { TicketPage } from "./components/TicketPage";
import TicketEdit from "./components/TicketEdit";

function App() {
  const navigate = useNavigate();
  return (
    <main className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand-link">
          <span className="brand-mark">ZT</span>
          <span>Z-Tickets</span>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<TicketPage />} />
        <Route
          path="/create"
          element={<TicketCreate onDone={() => navigate("/")} />}
        />
        <Route
          path="/tickets/:TicketId/edit"
          element={<TicketEdit onDone={() => navigate("/")} />}
        />
      </Routes>
    </main>
  );
}

export default App;
