import React from "react";
import Signup from "./Auth/Signup.jsx";
import Login from "./Auth/Login.jsx";
import { Route, Routes } from "react-router-dom";
import Dashborad from "./component/Dashborad.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route
          path="*"
          element={
            <h1 className="text-2xl text-center py-4 font-extrabold">
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
