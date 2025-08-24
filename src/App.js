import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RoutePage from "./RoutePage";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/route1" element={<RoutePage routeNumber={1} />} />
        <Route path="/route2" element={<RoutePage routeNumber={2} />} />
        <Route path="/route3" element={<RoutePage routeNumber={3} />} />
        <Route path="/route4" element={<RoutePage routeNumber={4} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
