import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    nav("/notes");
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={handleLogin}>
          <input className="form-control mb-2" placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)} />

          <input type="password" className="form-control mb-3" placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)} />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}