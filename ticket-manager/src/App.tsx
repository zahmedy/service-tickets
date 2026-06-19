// ticket-manager/src/App.tsx
import { Link, Routes, Route } from "react-router";
import "./App.css";
import TicketCreate from "./components/TicketCreate";
import { TicketPage } from "./components/TicketPage";

function App() {
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
          element={<TicketCreate onDone={() => console.log("Done")} />}
        />
      </Routes>
    </main>
  );
}

export default App;
