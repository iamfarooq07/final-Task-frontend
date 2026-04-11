import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Vite ke liye 'import.meta.env' aur CRA ke liye 'process.env'
    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setEmail("");
      setPassword("");

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login Failed!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const fromSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    // Super Dark Background with subtle radial glow
    <div className="w-screen h-screen flex justify-center items-center bg-[#050505] font-sans relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>

      {/* Glass Card */}
      <div className="w-full max-w-md p-10 bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl z-10 mx-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Welcome
          </h1>
          <p className="text-zinc-500 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={fromSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 text-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot?
              </button>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 text-white"
            />
          </div>

          {/* Submit Button */}
          <button className="mt-4 bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all active:scale-[0.97] shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Log In
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link to="/" className="text-white font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
