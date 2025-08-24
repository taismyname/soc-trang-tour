import { useLocation, useNavigate } from "react-router-dom";

function HeaderFooterLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <footer className="p-4 text-center text-gray-400 text-sm font-sans border-t">
        tnghnex 2025 - Airbus A350
      </footer>
    </div>
  );
}

export default function Route1() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <HeaderFooterLayout>
      <header className="p-4 text-right">
        <p className="font-sans font-bold text-gray-800 text-base">
          Xin chào, {user.username}
        </p>
        <p className="font-sans text-gray-600 text-sm">
          {user.partner}, {user.vehicle}
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center space-y-4">
          <h2 className="text-xl font-bold">Lộ trình 1</h2>
          <p>Từ địa chỉ 1 đến địa chỉ 2</p>
          <p>Quãng đường: ab km, dự kiến c h để hoàn thành</p>
          <div className="flex flex-col gap-3 mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
              Mở maps cho tiện nè
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
              Check-in nè
            </button>
            <button
              onClick={() => navigate("/route2", { state: { user } })}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
              Oker típ
            </button>
          </div>
        </div>
      </main>
    </HeaderFooterLayout>
  );
}
