import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", {
        name,
        password,
      });

      alert("Register berhasil");
      nav("/");
    } catch (err) {
      alert("Register gagal");
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Register</h4>

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            placeholder="Nama"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          Sudah punya akun? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}