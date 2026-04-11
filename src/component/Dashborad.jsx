import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  // Example user name
  const userName = "Farooq";

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged Out Successfully", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  };

  return (
    // Matching Deep Dark Background
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 font-sans relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>

      {/* Main Glass Dashboard Card */}
      <div className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 md:p-12 z-10 my-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-zinc-500 mt-2 text-lg">
              Welcome back,{" "}
              <span className="text-indigo-400 font-semibold">{userName}</span>{" "}
              👋
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold px-8 py-3 rounded-2xl transition-all duration-300 active:scale-95 shadow-lg shadow-red-500/5"
          >
            Logout
          </button>
        </div>

        {/* Stats/Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors group">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Profile Info
            </h2>
            <div className="space-y-3">
              <p className="text-zinc-400">
                User Name:{" "}
                <span className="text-white font-medium ml-2">{userName}</span>
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Your account is active and verified. You can update your
                settings anytime.
              </p>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors group">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Recent Activity
            </h2>
            <p className="text-zinc-400 italic">
              "Successfully logged in today"
            </p>
            <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
              System logs show no unusual activity on your account.
            </p>
          </div>
        </div>

        {/* Footer Announcement (Indigo Glass) */}
        <div className="mt-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] p-6 md:p-8 flex items-start gap-4">
          <div className="text-2xl">🎉</div>
          <div>
            <p className="text-indigo-300 font-bold text-lg">
              Ready to explore?
            </p>
            <p className="text-indigo-200/60 text-sm mt-1">
              This is your personal workspace. Start adding tasks, managing your
              projects, or checking your analytics right from here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
