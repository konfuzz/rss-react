import { NavLink } from "react-router";
export function Header() {
  return (
    <header className="header">
      <h1>Recipe Search</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}