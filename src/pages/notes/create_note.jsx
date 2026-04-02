import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/navbar";
import { FileText, Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() && !content.trim()) {
      alert("Judul atau konten tidak boleh kosong");
      return;
    }

    setIsLoading(true);
    
    try {
      await API.post("/notes", { title, content });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/notes");
      }, 1500);
      
    } catch (err) {
      console.log("ERROR CREATE NOTE:", err);
      alert(err.response?.data?.message || "Gagal menambahkan catatan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .create-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
          padding-top: 70px;
        }

        /* Background Pattern */
        .create-wrapper::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
        }

        /* Floating Shapes */
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
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
        .create-container {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 40px 60px;
        }

        /* Header Section */
        .create-header {
          margin-bottom: 30px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        /* Card */
        .create-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .create-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
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

        .card-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .card-header p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        /* Form */
        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-control.textarea {
          padding: 12px 16px;
          resize: vertical;
          min-height: 200px;
          font-family: inherit;
          line-height: 1.6;
        }

        .input-wrapper.textarea .input-icon {
          top: 20px;
          transform: none;
        }

        /* Button Actions */
        .button-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-cancel, .btn-save {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-cancel {
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-cancel:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
        }

        .btn-save {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-save:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .btn-save:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Loading Spinner */
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Toast */
        .success-toast {
          position: fixed;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          background: #10b981;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          animation: slideDown 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Character Counter */
        .char-counter {
          text-align: right;
          font-size: 12px;
          color: #9ca3af;
          margin-top: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .create-wrapper {
            padding-top: 65px;
          }

          .create-container {
            padding: 20px 20px 40px;
          }

          .create-card {
            padding: 28px 24px;
          }

          .card-header h2 {
            font-size: 24px;
          }

          .icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .button-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .create-wrapper {
            padding-top: 60px;
          }

          .create-container {
            padding: 16px 16px 30px;
          }

          .create-card {
            padding: 24px 20px;
          }

          .card-header h2 {
            font-size: 22px;
          }

          .btn-cancel, .btn-save {
            padding: 10px 20px;
          }
        }
      `}</style>

      <div className="create-wrapper">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="create-container">
          {/* Back Button */}
          <div className="create-header">
            <button className="back-button" onClick={() => navigate("/notes")}>
              <ArrowLeft size={18} />
              Kembali ke Notes
            </button>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="success-toast">
              <CheckCircle size={18} />
              <span>Catatan berhasil ditambahkan!</span>
            </div>
          )}

          {/* Main Card */}
          <div className="create-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <FileText size={32} color="white" />
              </div>
              <h2>Buat Catatan Baru</h2>
              <p>Isi judul dan konten catatan Anda di bawah ini</p>
            </div>

            <form onSubmit={submit}>
              <div className="form-group">
                <label>Judul Catatan</label>
                <div className="input-wrapper">
                  <FileText className="input-icon" size={18} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan judul catatan..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="100"
                  />
                </div>
                <div className="char-counter">
                  {title.length}/100 karakter
                </div>
              </div>

              <div className="form-group">
                <label>Konten Catatan</label>
                <div className="input-wrapper textarea">
                  <textarea
                    className="form-control textarea"
                    rows="8"
                    placeholder="Tuliskan catatan Anda di sini..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div className="button-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/notes")}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={isLoading || (!title.trim() && !content.trim())}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Simpan Catatan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}