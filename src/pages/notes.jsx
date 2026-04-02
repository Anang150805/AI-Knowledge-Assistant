import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Daftar Notes</h3>

        <div className="row">
          {notes.map((n) => (
            <div className="col-md-4" key={n.id}>
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5>{n.title}</h5>
                  <p>{n.content.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}