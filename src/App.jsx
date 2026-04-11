import React from "react";
import Signup from "./Auth/Signup.jsx";
import Login from "./Auth/Login.jsx";
import Dashboard from "./component/Dashboard.jsx";
import PublicProfile from "./pages/PublicProfile.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/u/:username" element={<PublicProfile />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <p className="text-white text-2xl font-bold">404 — Page Not Found</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
