import { Link, useNavigate } from "react-router-dom";
import { Sparkles, LogOut, Plus, Bot } from "lucide-react";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <>
      <style>{`
        .navbar-custom {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 0 40px;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .navbar-logo:hover {
          transform: scale(1.02);
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .navbar-logo h2 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
        }

        .navbar-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* Button Styles */
        .btn-nav {
          padding: 8px 18px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-create {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .btn-ai {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
        }

        .btn-ai:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
        }

        .btn-logout {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
        }

        .btn-logout:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar-custom {
            padding: 0 20px;
          }

          .navbar-container {
            padding: 10px 0;
          }

          .logo-icon {
            width: 32px;
            height: 32px;
          }

          .logo-icon svg {
            width: 16px;
            height: 16px;
          }

          .navbar-logo h2 {
            font-size: 18px;
          }

          .btn-nav {
            padding: 6px 12px;
            font-size: 12px;
          }

          .btn-nav span {
            display: none;
          }

          .navbar-buttons {
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .navbar-custom {
            padding: 0 16px;
          }

          .btn-nav {
            padding: 8px;
          }
        }
      `}</style>

      <nav className="navbar-custom">
        <div className="navbar-container">
          <Link to="/notes" className="navbar-logo">
            <div className="logo-icon">
              <Sparkles size={18} color="white" />
            </div>
            <h2>AI Notes</h2>
          </Link>

          <div className="navbar-buttons">
            <Link to="/create" className="btn-nav btn-create">
              <Plus size={16} />
              <span>Tambah</span>
            </Link>
            
            <Link to="/ai" className="btn-nav btn-ai">
              <Bot size={16} />
              <span>AI</span>
            </Link>
            
            <button className="btn-nav btn-logout" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}