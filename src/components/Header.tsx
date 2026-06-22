'use client'

import Link from "next/link";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { isDark, toggleTheme } = useContext(AppContext);
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  }

  return (
    <header className="header">
      <h1>Recipe Search</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
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