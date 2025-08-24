import { useNavigate } from "react-router-dom";
import background from "./assets/522800704_1219165133291946_4124612860038898981_n.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay trắng 70% */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Header */}
      <header className="p-4 absolute top-0 left-0 w-full">
        <h1 className="font-sans font-bold text-gray-800 text-lg">tngh mien tay autumn 2025</h1>
      </header>

      {/* Content chính */}
      <div className="flex-grow flex flex-col justify-center items-center relative z-10 text-center p-4">
        <p className="text-black text-lg">Dạo mạnh nhất 2025 chính thức gọi tên</p>
        <h2 className="text-4xl font-bold text-blue-900 mt-2">SÓC TRĂNG TOUR 2025</h2>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
        >
          GÉT GÔ !!!!!
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-gray-400 p-4 text-sm">
        tnghnex 2025 - Airbus A350
      </footer>
    </div>
  );
}
