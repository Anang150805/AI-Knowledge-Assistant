import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/notes", { title, content });
    alert("Berhasil tambah note");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h4>Tambah Note</h4>

          <form onSubmit={submit}>
            <input className="form-control mb-2"
              placeholder="Judul"
              onChange={(e)=>setTitle(e.target.value)} />

            <textarea className="form-control mb-3"
              rows="5"
              placeholder="Isi"
              onChange={(e)=>setContent(e.target.value)} />

            <button className="btn btn-success">Simpan</button>
          </form>
        </div>
      </div>
    </>
  );
}