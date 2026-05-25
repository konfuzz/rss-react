import { NavLink } from "react-router";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export function Header() {
  const { isDark, toggleTheme } = useContext(AppContext);
  return (
    <header className="header">
      <h1>Recipe Search</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <button onClick={toggleTheme}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}