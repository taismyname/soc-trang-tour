import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function RoutePage({ routeNumber = 1, totalRoutes = 4 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [checkedInFile, setCheckedInFile] = useState(null);

  // ✅ Hooks luôn đứng trên cùng
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadCheckin = async () => {
      try {
        const docRef = doc(db, "checkins", `${user.username}_route${routeNumber}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCheckedInFile(docSnap.data().base64);
        }
      } catch (error) {
        console.log("Lỗi load check-in:", error);
      }
    };
    loadCheckin();
  }, [user, navigate, routeNumber]);

  if (!user) return null; // render tạm khi redirect

  // Check-in ảnh
  const handleCheckIn = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setCheckedInFile(base64);

      try {
        await setDoc(doc(db, "checkins", `${user.username}_route${routeNumber}`), {
          user: user.username,
          routeNumber,
          timestamp: new Date(),
          base64,
        });
      } catch (error) {
        console.log("Lỗi lưu check-in:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  // Chuyển sang lộ trình tiếp theo
  const handleNext = () => {
    if (!checkedInFile) return;
    if (routeNumber < totalRoutes) {
      navigate(`/route${routeNumber + 1}`, { state: { user } });
    } else {
      alert("Đã hoàn thành tất cả lộ trình!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 bg-white shadow-md">
        <h1 className="font-sans font-bold text-gray-800 text-lg md:text-xl">
          tngh mien tay autumn 2025
        </h1>
      </header>

      {/* Main */}
      <main className="flex-grow p-4">
        {/* User info */}
        <div className="flex justify-end mb-4 text-right">
          <div>
            <p className="font-bold text-gray-800">{`Xin chào, ${user.username}`}</p>
            <p className="text-gray-600">{`${user.partner}, ${user.vehicle}`}</p>
          </div>
        </div>

        {/* Lộ trình */}
        <div className="bg-white rounded-2xl p-6 shadow-md max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold">{`Lộ trình ${routeNumber}`}</h2>
          <p><strong>Từ:</strong> địa chỉ 1</p>
          <p><strong>Đến:</strong> địa chỉ 2</p>
          <p>Quãng đường: ab km, dự kiến c h để hoàn thành</p>
          <p className="text-sm text-gray-500">
            {`Cần hoàn thành ${totalRoutes - routeNumber} lộ trình nữa đến đích`}
          </p>

          {/* Nút mở Maps */}
          <button
            onClick={() => window.open("https://www.google.com/maps/dir/Địa+chỉ+1/Địa+chỉ+2", "_blank")}
            className="w-full py-2 rounded-lg text-white font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 hover:scale-105 transition-transform"
          >
            Mở maps cho tiện nè
          </button>

          {/* Check-in + Next */}
          <div className="flex gap-4 mt-4">
            <label className="flex-1 cursor-pointer py-2 rounded-lg text-white font-bold text-center bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:scale-105 transition-transform">
              Check-in nè
              <input type="file" accept="image/*" className="hidden" onChange={handleCheckIn} />
            </label>
            <button
              onClick={handleNext}
              disabled={!checkedInFile}
              className={`flex-1 py-2 rounded-lg text-white font-bold text-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 hover:scale-105 transition-transform ${!checkedInFile ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {routeNumber === totalRoutes ? "Xong" : "Ôker típ"}
            </button>
          </div>

          {/* Ảnh đã check-in */}
          {checkedInFile && (
            <div className="mt-4">
              <p className="text-sm font-sans mb-2">File hình gửi:</p>
              <img
                src={checkedInFile}
                alt={`checkin-route${routeNumber}`}
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-400 text-sm font-sans border-t">
        tnghnex 2025 - Airbus A350
      </footer>
    </div>
  );
}
