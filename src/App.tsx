import { Routes, Route } from "react-router";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { ErrorBoundary } from "./components/ErrorBoundary";


export default function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </ErrorBoundary>
  );
}