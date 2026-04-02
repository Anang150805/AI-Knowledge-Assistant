import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, LogIn, Eye, EyeOff, Sparkles } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/login", {
        username,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);
      localStorage.setItem("token", res.data.data.token);
      nav("/notes");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response);
      alert(err.response?.data?.message || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }

        /* Background Gradient */
        .bg-gradient {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Background Pattern */
        .bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        /* Floating Shapes Animation */
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          filter: blur(60px);
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          top: -150px;
          right: -100px;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          animation-duration: 25s;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          bottom: -100px;
          left: -80px;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
          animation-duration: 18s;
          animation-delay: -5s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          top: 40%;
          left: 15%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
          animation-duration: 22s;
          animation-delay: -10s;
        }

        .shape-4 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          right: 15%;
          background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%);
          animation-duration: 28s;
          animation-delay: -15s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) translateX(-15px) rotate(240deg);
          }
        }

        /* Container */
        .login-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          padding: 20px;
        }

        /* Card */
        .login-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          padding: 48px 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }

        /* Header */
        .card-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
          }
        }

        .sparkle-icon {
          color: white;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        /* Form */
        .login-form {
          margin-bottom: 32px;
        }

        .input-group {
          position: relative;
          margin-bottom: 28px;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px 14px 48px;
          font-size: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          background: white;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
          font-weight: 500;
        }

        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .input-field:focus + .input-border {
          width: 100%;
        }

        .input-group:hover .input-icon {
          color: #667eea;
        }

        .input-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        /* Password Toggle */
        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          transition: color 0.3s ease;
          z-index: 1;
        }

        .password-toggle:hover {
          color: #667eea;
        }

        /* Button */
        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .login-btn:hover::before {
          left: 100%;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(102, 126, 234, 0.4);
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Footer */
        .card-footer {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }

        .register-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .register-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .register-link:hover::after {
          width: 100%;
        }

        .register-link:hover {
          color: #764ba2;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .login-card {
            padding: 36px 28px !important;
          }
          
          .title {
            font-size: 28px !important;
          }

          .icon-wrapper {
            width: 60px !important;
            height: 60px !important;
          }

          .sparkle-icon {
            width: 28px !important;
            height: 28px !important;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 16px !important;
          }

          .login-card {
            padding: 28px 20px !important;
          }
          
          .title {
            font-size: 24px !important;
          }

          .subtitle {
            font-size: 13px !important;
          }

          .input-field {
            padding: 12px 12px 12px 44px !important;
            font-size: 14px !important;
          }

          .login-btn {
            padding: 12px !important;
            font-size: 14px !important;
          }
        }

        /* Smooth scrolling */
        @media (prefers-reduced-motion: reduce) {
          .shape,
          .login-card,
          .login-btn::before,
          .register-link::after {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div className="login-wrapper">
        {/* Background Gradient */}
        <div className="bg-gradient"></div>
        
        {/* Background Pattern */}
        <div className="bg-pattern"></div>

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        {/* Main Container */}
        <div className="login-container">
          <div className="login-card">
            {/* Header Section */}
            <div className="card-header">
              <div className="icon-wrapper">
                <Sparkles className="sparkle-icon" size={32} />
              </div>
              <h1 className="title">Welcome Back</h1>
              <p className="subtitle">Masuk ke akun Anda</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="input-border"></div>
              </div>

              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <div className="input-border"></div>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <LogIn size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer Section */}
            <div className="card-footer">
              <p>
                Belum punya akun?{" "}
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}