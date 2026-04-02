import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/notes">AI Notes</Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/create">Tambah</Link>
          <Link className="btn btn-outline-info me-2" to="/ai">AI</Link>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}