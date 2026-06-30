import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AccessGuard({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center  px-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Tizimga kirmagansiz</h2>
          <p className="text-slate-400 mb-6">
            Bu funksiyadan foydalanish uchun avval tizimga kiring.
          </p>
          <button
            onClick={() => navigate("/registration")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Ro'yxatdan o'tish / Kirish
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "haydovchi") {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold mb-2">Ruxsat yo'q</h2>
          <p className="text-slate-400 mb-6">
            Siz shaxobcha egasi sifatida kirgansiz. Bu funksiya faqat haydovchilar uchun.
            Iltimos, haydovchi sifatida qayta ro'yxatdan o'ting yoki kiring.
          </p>
          <button
            onClick={() => navigate("/registration")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Haydovchi sifatida kirish
          </button>
        </div>
      </div>
    );
  }

  return children;
}