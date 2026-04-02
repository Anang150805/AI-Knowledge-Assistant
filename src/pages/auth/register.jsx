import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState(""); // 🔥 ganti name → username
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", {
        username, // ✅ FIX
        password,
      });

      console.log("REGISTER SUCCESS:", res.data);

      // 🔥 simpan token (biar auto login)
      localStorage.setItem("token", res.data.data.token);

      alert("Register berhasil");
      nav("/notes");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response);
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Register</h4>

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}