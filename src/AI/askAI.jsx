import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function AskAI() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");

  const ask = async () => {
    const res = await API.post("/ai/ask", { question: q });
    setAns(res.data.answer);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h4>Ask AI</h4>

          <textarea className="form-control mb-2"
            onChange={(e)=>setQ(e.target.value)} />

          <button className="btn btn-primary mb-3" onClick={ask}>
            Tanya
          </button>

          <div className="alert alert-info">
            {ans}
          </div>
        </div>
      </div>
    </>
  );
}