import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import RecipeDetail from "./pages/RecipeDetail";
import { AppContext } from "./context/AppContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Flyout } from "./components/Flyout";

export default function App() {
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <ErrorBoundary>
      <AppContext.Provider value={{ isDark, toggleTheme }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<RecipeDetail />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Flyout />
      </AppContext.Provider>
    </ErrorBoundary>
  );
}