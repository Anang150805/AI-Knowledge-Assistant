import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/navbar";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    try {
      const res = await API.get("/notes");

      console.log("NOTES:", res.data);

      // 🔥 FIX: ambil dari data.data
      setNotes(res.data.data || []);
    } catch (err) {
      console.log("ERROR NOTES:", err.response);

      // 🔐 kalau token invalid → logout
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Daftar Notes</h3>

        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>Tidak ada notes</p>
        ) : (
          <div className="row">
            {notes.map((n) => (
              <div className="col-md-4" key={n.id}>
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5>{n.title}</h5>

                    <p>
                      {n.content
                        ? n.content.substring(0, 100) + "..."
                        : "Tidak ada konten"}
                    </p>

                    {/* 🔥 optional detail */}
                    <small className="text-muted">
                      ID: {n.id}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}