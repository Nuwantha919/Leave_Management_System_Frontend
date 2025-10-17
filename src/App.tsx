// App.tsx
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar or sidebar can go here */}
      <main className="flex-grow-1">
        <Outlet /> {/* Child pages render here */}
      </main>
      {/* Optional footer */}
    </div>
  );
}
