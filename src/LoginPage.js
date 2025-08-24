import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const docRef = doc(db, "user", username);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setError("User không tồn tại!");
      return;
    }
    const userData = docSnap.data();
    if (userData.password !== password) {
      setError("Sai mật khẩu!");
      return;
    }

    if (username === "deptrailatai") {
      navigate("/admin");
    } else {
      // Lấy routeNumber hiện tại từ checkins
      let routeNumber = 1;
      for (let i = 1; i <= 4; i++) {
        const checkinRef = doc(db, "checkins", `${username}_route${i}`);
        const checkinSnap = await getDoc(checkinRef);
        if (!checkinSnap.exists()) {
          routeNumber = i;
          break;
        }
        if (i === 4) routeNumber = 4;
      }
      navigate(`/route${routeNumber}`, { state: { user: { username, partner: userData.partner, vehicle: userData.vehicle } } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 justify-center items-center p-4">
      <header className="absolute top-0 left-0 w-full p-4 bg-white shadow-md">
        <h1 className="font-sans font-bold text-gray-800 text-lg">tngh mien tay autumn 2025</h1>
      </header>

      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-md space-y-4">
        <h2 className="text-center font-bold text-gray-800">mài là aiiii???????</h2>
        <input
          type="text"
          placeholder="Tên"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-lg border placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-lg border placeholder-gray-400"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
        >
          Ôker
        </button>
      </div>

      <footer className="absolute bottom-0 w-full text-center text-gray-400 p-4 text-sm">
        tnghnex 2025 - Airbus A350
      </footer>
    </div>
  );
}
