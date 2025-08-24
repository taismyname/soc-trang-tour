import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const users = [
  { username: "dominhvuong", name: "Đỗ Minh Vương" },
  { username: "ledinhquoc", name: "Lê Đình Quốc" },
  { username: "tranlehuy", name: "Trần Lê Huy" },
  { username: "tai", name: "Tài" },
];

const totalRoutes = 4;

export default function AdminPage() {
  const [checkins, setCheckins] = useState({}); // { username_routeX: base64/null }

  useEffect(() => {
    const fetchCheckins = async () => {
      const newCheckins = {};
      for (let user of users) {
        for (let i = 1; i <= totalRoutes; i++) {
          const docRef = doc(db, "checkins", `${user.username}_route${i}`);
          const docSnap = await getDoc(docRef);
          newCheckins[`${user.username}_route${i}`] = docSnap.exists()
            ? docSnap.data().base64
            : null;
        }
      }
      setCheckins(newCheckins);
    };
    fetchCheckins();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <header className="p-4 bg-white shadow-md text-center">
        <h1 className="font-bold text-xl">Admin - Tất cả check-in</h1>
      </header>

      <main className="mt-4 space-y-6">
        {users.map((user) => (
          <div key={user.username} className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="font-bold text-lg mb-2">{user.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((routeNum) => {
                const key = `${user.username}_route${routeNum}`;
                const base64 = checkins[key];
                return (
                  <div key={key} className="p-2 bg-gray-50 rounded-lg text-center">
                    <p className="font-bold mb-1">Lộ trình {routeNum}</p>
                    {base64 ? (
                      <img src={base64} alt={`${user.username}_route${routeNum}`} className="w-full h-auto rounded" />
                    ) : (
                      <p className="text-gray-400">bạn ni chưa có check-in</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
