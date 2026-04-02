import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

// 🔥 halaman
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Notes from "./pages/notes/notes";
import CreateNote from "./pages/notes/create_note";
import AskAI from "./pages/AI/askAI";

// 🔐 Protected
import ProtectedRoute from "./components/protectedRoute";

// 🔍 cek login
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// 🔥 HOME
function Home() {
  const [count, setCount] = useState(0);

  return (
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <div>
        <h1>AI Knowledge Assistant</h1>
        <p>Frontend React + Vite + Bootstrap 🚀</p>
      </div>

      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>

      <div className="mt-4">
        <Link to="/notes" className="btn btn-primary me-2">
          Notes
        </Link>
        <Link to="/create" className="btn btn-success me-2">
          Tambah
        </Link>
        <Link to="/ai" className="btn btn-warning me-2">
          AI
        </Link>
      </div>
    </section>
  );
}

// 🔥 APP
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ ROOT REDIRECT */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/notes" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🌐 PUBLIC */}
        <Route
          path="/login"
          element={
            isAuthenticated() ? (
              <Navigate to="/notes" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated() ? (
              <Navigate to="/notes" />
            ) : (
              <Register />
            )
          }
        />

        {/* 🔐 PROTECTED */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AskAI />
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;