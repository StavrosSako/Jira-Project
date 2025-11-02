import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Login from "./pages/LoginPage.tsx";
import Signup from "./pages/SignupPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
