import { NavLink } from "react-router";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useQueryClient } from '@tanstack/react-query'


export function Header() {
  const queryClient = useQueryClient();
  const { isDark, toggleTheme } = useContext(AppContext);

  const handleRefresh = () => {
    queryClient.invalidateQueries()
  }

  return (
    <header className="header">
      <h1>Recipe Search</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="menu-buttons">
        <button className="refresh-btn" onClick={handleRefresh} title="Refresh data">
          ↻
        </button>
        <button onClick={toggleTheme}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}