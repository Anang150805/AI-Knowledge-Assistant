import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/navbar";
import { FileText, Plus, Search, Edit2, Trash2, Calendar, X, AlertCircle } from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getNotes = async () => {
    try {
      const res = await API.get("/notes");
      console.log("NOTES:", res.data);
      setNotes(res.data.data || []);
    } catch (err) {
      console.log("ERROR NOTES:", err.response);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setFormData({ title: note.title || "", content: note.content || "" });
    } else {
      setEditingNote(null);
      setFormData({ title: "", content: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormData({ title: "", content: "" });
  };

  const handleSaveNote = async () => {
    try {
      if (editingNote) {
        await API.put(`/notes/${editingNote.id}`, formData);
      } else {
        await API.post("/notes", formData);
      }
      getNotes();
      handleCloseModal();
    } catch (err) {
      console.log("ERROR SAVE NOTE:", err);
      alert("Gagal menyimpan catatan");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      getNotes();
      setDeleteConfirm(null);
    } catch (err) {
      console.log("ERROR DELETE NOTE:", err);
      alert("Gagal menghapus catatan");
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

        .notes-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
          padding-top: 70px;
        }

        /* Background Pattern */
        .notes-wrapper::before {
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
        .notes-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 40px 60px;
        }

        /* Header Section */
        .notes-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .notes-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
        }

        .notes-title {
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 10px;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .notes-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        /* Search Section */
        .search-section {
          margin-bottom: 40px;
        }

        .search-box {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px 14px 50px;
          font-size: 15px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.95);
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
          background: white;
        }

        /* Add Note Button */
        .add-note-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 20;
        }

        .add-note-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Notes Grid */
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        /* Note Card */
        .note-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .note-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .note-card:hover::before {
          transform: scaleX(1);
        }

        .note-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
        }

        .note-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .note-title-icon {
          color: #667eea;
        }

        .note-content {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          flex-wrap: wrap;
          gap: 12px;
        }

        .note-date {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #9ca3af;
        }

        .note-actions {
          display: flex;
          gap: 10px;
        }

        /* Button Styles */
        .btn-edit, .btn-delete {
          padding: 8px 16px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-edit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-edit:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-delete {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .loading-text {
          margin-top: 20px;
          color: white;
          font-size: 16px;
        }

        /* Empty State */
        .empty-container {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .empty-title {
          font-size: 24px;
          color: white;
          margin-bottom: 10px;
        }

        .empty-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 500px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          padding: 24px 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          transition: all 0.3s ease;
          padding: 5px;
          border-radius: 8px;
        }

        .modal-close:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .modal-footer {
          padding: 0 24px 24px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-cancel, .btn-save {
          padding: 10px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
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

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Delete Confirmation */
        .confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
        }

        .confirm-container {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          animation: slideUp 0.3s ease;
        }

        .confirm-icon {
          width: 70px;
          height: 70px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 24px auto 0;
        }

        .confirm-title {
          font-size: 22px;
          font-weight: 700;
          margin: 20px 0 10px;
          color: #1f2937;
        }

        .confirm-message {
          color: #6b7280;
          margin-bottom: 24px;
          padding: 0 24px;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
          padding: 0 24px 24px;
        }

        .btn-confirm-cancel, .btn-confirm-delete {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-confirm-cancel {
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-confirm-cancel:hover {
          background: #e5e7eb;
        }

        .btn-confirm-delete {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .btn-confirm-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .notes-wrapper {
            padding-top: 65px;
          }

          .notes-container {
            padding: 30px 20px 40px;
          }

          .notes-title {
            font-size: 32px;
          }

          .notes-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .add-note-btn {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }

          .btn-edit, .btn-delete {
            padding: 6px 12px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .notes-wrapper {
            padding-top: 60px;
          }

          .notes-container {
            padding: 20px 16px 30px;
          }

          .notes-title {
            font-size: 28px;
          }

          .note-card {
            padding: 20px;
          }

          .btn-edit span, .btn-delete span {
            display: none;
          }

          .btn-edit, .btn-delete {
            padding: 8px;
          }
        }
      `}</style>

      <div className="notes-wrapper">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="notes-container">
          {/* Header */}
          <div className="notes-header">
            <div className="notes-icon">
              <FileText size={40} color="white" />
            </div>
            <h1 className="notes-title">My Notes</h1>
            <p className="notes-subtitle">Kelola dan simpan semua catatan penting Anda</p>
          </div>

          {/* Search */}
          <div className="search-section">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Cari catatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Memuat catatan...</div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-container">
              <div className="empty-icon">
                <FileText size={60} color="rgba(255,255,255,0.5)" />
              </div>
              <h3 className="empty-title">
                {searchTerm ? "Catatan tidak ditemukan" : "Belum ada catatan"}
              </h3>
              <p className="empty-subtitle">
                {searchTerm 
                  ? "Coba dengan kata kunci lain" 
                  : "Mulai buat catatan pertama Anda"}
              </p>
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <div className="note-card" key={note.id}>
                  <div className="note-title">
                    <FileText className="note-title-icon" size={20} />
                    {note.title || "Tanpa Judul"}
                  </div>
                  <div className="note-content">
                    {note.content
                      ? note.content.length > 150
                        ? note.content.substring(0, 150) + "..."
                        : note.content
                      : "Tidak ada konten"}
                  </div>
                  <div className="note-meta">
                    <div className="note-date">
                      <Calendar size={14} />
                      <span>ID: {note.id.substring(0, 8)}...</span>
                    </div>
                    <div className="note-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleOpenModal(note)}
                      >
                        <Edit2 size={14} />
                        <span>Edit</span>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => setDeleteConfirm(note.id)}
                      >
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Note Button */}
          <button className="add-note-btn" onClick={() => handleOpenModal()}>
            <Plus size={28} />
          </button>
        </div>
      </div>

      {/* Modal Add/Edit Note */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingNote ? "Edit Catatan" : "Catatan Baru"}</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  placeholder="Masukkan judul catatan"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Konten</label>
                <textarea
                  placeholder="Masukkan isi catatan"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseModal}>
                Batal
              </button>
              <button className="btn-save" onClick={handleSaveNote}>
                {editingNote ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-container">
            <div className="confirm-icon">
              <AlertCircle size={40} color="#ef4444" />
            </div>
            <h3 className="confirm-title">Hapus Catatan?</h3>
            <p className="confirm-message">
              Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => setDeleteConfirm(null)}>
                Batal
              </button>
              <button className="btn-confirm-delete" onClick={() => handleDeleteNote(deleteConfirm)}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}