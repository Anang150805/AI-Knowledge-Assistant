import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// import halaman
import Notes from "./pages/notes/Notes";
import CreateNote from "./pages/notes/CreateNote";
import AskAI from "./pages/ai/AskAI";

// 🔥 HOME (ISI DARI TEMPLATE KAMU)
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
      </section>
    </>
  );
}

// 🔥 APP ROUTER
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/ai" element={<AskAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;