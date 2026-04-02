import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/navbar";
import { Bot, Send, Sparkles, MessageCircle, Loader, Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const ask = async () => {
    if (!question.trim()) {
      alert("Silakan masukkan pertanyaan terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setIsTyping(true);
    setAnswer("");

    try {
      const res = await API.post("/ai/ask", { question: question });
      
      // Simulate typing effect
      const fullAnswer = res.data.answer || "Maaf, saya tidak bisa menjawab pertanyaan tersebut.";
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullAnswer.length) {
          setAnswer(fullAnswer.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20);
      
    } catch (err) {
      console.log("ERROR AI:", err);
      setAnswer(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi");
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  const clearChat = () => {
    setQuestion("");
    setAnswer("");
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

        .ai-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
          padding-top: 70px;
        }

        /* Background Pattern */
        .ai-wrapper::before {
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
        .ai-container {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 40px 60px;
        }

        /* Header Section */
        .ai-header {
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
          cursor: pointer;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        /* Main Card */
        .ai-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .ai-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(245, 158, 11, 0);
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

        /* Question Section */
        .question-section {
          margin-bottom: 32px;
        }

        .question-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .question-input-wrapper {
          position: relative;
        }

        .question-icon {
          position: absolute;
          left: 16px;
          top: 20px;
          color: #9ca3af;
        }

        .question-textarea {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
          resize: vertical;
          min-height: 120px;
        }

        .question-textarea:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        /* Button Actions */
        .button-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn-clear, .btn-ask {
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

        .btn-clear {
          flex: 1;
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-clear:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
        }

        .btn-ask {
          flex: 2;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .btn-ask:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
        }

        .btn-ask:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Answer Section */
        .answer-section {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 2px solid #f3f4f6;
        }

        .answer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .answer-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .answer-content {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 16px;
          padding: 24px;
          min-height: 150px;
        }

        .answer-text {
          color: #1f2937;
          line-height: 1.6;
          font-size: 15px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 18px;
          background-color: #f59e0b;
          margin-left: 2px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .empty-answer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #9ca3af;
        }

        .empty-answer p {
          margin: 0;
          font-size: 14px;
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

        /* Example Questions */
        .examples-section {
          margin-top: 24px;
        }

        .examples-title {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 12px;
          text-align: center;
        }

        .examples-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .example-chip {
          background: #f3f4f6;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .example-chip:hover {
          background: #fef3c7;
          color: #d97706;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ai-wrapper {
            padding-top: 65px;
          }

          .ai-container {
            padding: 20px 20px 40px;
          }

          .ai-card {
            padding: 28px 24px;
          }

          .card-header h2 {
            font-size: 24px;
          }

          .icon-wrapper {
            width: 70px;
            height: 70px;
          }

          .button-actions {
            flex-direction: column;
          }

          .examples-grid {
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .ai-wrapper {
            padding-top: 60px;
          }

          .ai-container {
            padding: 16px 16px 30px;
          }

          .ai-card {
            padding: 24px 20px;
          }

          .card-header h2 {
            font-size: 22px;
          }

          .answer-content {
            padding: 16px;
          }
        }
      `}</style>

      <div className="ai-wrapper">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="ai-container">
          {/* Back Button */}
          <div className="ai-header">
            <button className="back-button" onClick={() => navigate("/notes")}>
              <ArrowLeft size={18} />
              Kembali ke Notes
            </button>
          </div>

          {/* Main Card */}
          <div className="ai-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <Bot size={40} color="white" />
              </div>
              <h2>AI Assistant</h2>
              <p>Tanyakan apa saja tentang catatan Anda atau dapatkan bantuan dari AI</p>
            </div>

            {/* Question Section */}
            <div className="question-section">
              <div className="question-label">
                <MessageCircle size={16} />
                <span>Pertanyaan Anda</span>
              </div>
              <div className="question-input-wrapper">
                <textarea
                  className="question-textarea"
                  placeholder="Contoh: Buatkan ringkasan catatan saya...&#10;Atau: Berikan ide untuk menulis tentang...&#10;Atau: Apa yang dimaksud dengan...?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </div>

              <div className="button-actions">
                <button className="btn-clear" onClick={clearChat} disabled={isLoading}>
                  <Sparkles size={16} />
                  Clear
                </button>
                <button className="btn-ask" onClick={ask} disabled={isLoading || !question.trim()}>
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Kirim Pertanyaan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Example Questions */}
            <div className="examples-section">
              <div className="examples-title">
                <Zap size={12} style={{ display: 'inline', marginRight: 4 }} />
                Contoh pertanyaan
              </div>
              <div className="examples-grid">
                {[
                  "Buatkan ringkasan catatan saya",
                  "Apa ide untuk menulis tentang AI?",
                  "Bagaimana cara meningkatkan produktivitas?",
                  "Jelaskan tentang machine learning",
                  "Tips menulis yang baik"
                ].map((example, index) => (
                  <div
                    key={index}
                    className="example-chip"
                    onClick={() => setQuestion(example)}
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Section */}
            <div className="answer-section">
              <div className="answer-header">
                <Bot size={20} color="#f59e0b" />
                <h3>Jawaban AI</h3>
              </div>
              <div className="answer-content">
                {answer ? (
                  <div className="answer-text">
                    {answer}
                    {isTyping && <span className="typing-cursor"></span>}
                  </div>
                ) : (
                  <div className="empty-answer">
                    <MessageCircle size={32} />
                    <p>Belum ada pertanyaan</p>
                    <p style={{ fontSize: 12 }}>Ketik pertanyaan di atas untuk memulai</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}