import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 🔥 import halaman
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Notes from "./pages/notes/Notes";
import CreateNote from "./pages/notes/CreateNote";
import AskAI from "./pages/ai/AskAI";

// 🔐 Protected Route
import ProtectedRoute from "./components/protectedRoute";

// 🔥 HOME (landing page kamu)
function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
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

        {/* 🔥 tombol navigasi */}
        <div className="mt-4">
          <a href="/" className="btn btn-secondary me-2">Home</a>
          <a href="/notes" className="btn btn-primary me-2">Notes</a>
          <a href="/create" className="btn btn-success me-2">Tambah</a>
          <a href="/ai" className="btn btn-warning me-2">AI</a>
          <a href="/login" className="btn btn-dark">Login</a>
        </div>
      </section>
    </>
  );
}

// 🔥 APP ROUTER
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 PROTECTED */}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;