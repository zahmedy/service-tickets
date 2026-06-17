type HomeProps = {
  onOpenTickets: () => void;
};

function Home({ onOpenTickets }: HomeProps) {
  return (
    <div>
      <button onClick={onOpenTickets} className="header-button">
        Welcome to Z-Tickets!
      </button>
    </div>
  );
}

export default Home;
