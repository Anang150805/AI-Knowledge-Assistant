import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState(""); // ✅ ganti email -> name
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", {
        name, // ✅ kirim name
        password,
      });

      localStorage.setItem("token", res.data.token);
      nav("/notes");
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            placeholder="Nama" // ✅ ubah placeholder
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          Belum punya akun? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}