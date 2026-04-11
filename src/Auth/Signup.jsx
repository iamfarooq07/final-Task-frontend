import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const API_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(response);

      toast.success("Sign Up Successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    // Super Dark Background with subtle radial glow (Same as Login)
    <div className="w-screen h-screen flex justify-center items-center bg-[#050505] font-sans relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>

      {/* Glass Card Container */}
      <div className="w-full max-w-md p-10 bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl z-10 mx-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Create Account
          </h1>
          <p className="text-zinc-500 text-sm">
            Please fill in the details to sign up
          </p>
        </div>

        <form onSubmit={formSubmit} className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 text-white"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 text-white"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 text-white"
            />
          </div>

          {/* Submit Button (White for contrast) */}
          <button className="mt-4 bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all active:scale-[0.97] shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Sign Up
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-white font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
