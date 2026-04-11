import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { getPublicProfile, incrementClick } from "../services/api";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicProfile(username)
      .then((res) => {
        const data = res.data;
        setProfile(data.profile || data);
        setLinks(data.links || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  const handleLinkClick = async (link) => {
    try { await incrementClick(link._id); } catch { /* silent */ }
    window.open(link.url, "_blank", "noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-white text-2xl font-bold mb-2">Profile not found</h1>
        <p className="text-zinc-500">@{username} doesn't exist yet.</p>
      </div>
    );
  }

  const activeLinks = links.filter((l) => l.isActive);

  return (
    <div className="min-h-screen bg-[#050505] font-sans relative overflow-hidden flex flex-col items-center px-4 py-16">
      {/* Background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          {profile?.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.fullName}
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/50 mb-4 shadow-lg shadow-indigo-500/10"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-indigo-500/20">
              {profile?.fullName?.[0] || username?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <h1 className="text-white text-2xl font-bold tracking-tight">
            {profile?.fullName || username}
          </h1>
          {profile?.bio && (
            <p className="text-zinc-400 text-sm mt-2 max-w-xs leading-relaxed">{profile.bio}</p>
          )}
          <p className="text-zinc-600 text-xs mt-1">@{username}</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {activeLinks.length === 0 && (
            <p className="text-zinc-600 text-center py-8">No links to show yet.</p>
          )}
          {activeLinks.map((link) => (
            <button
              key={link._id}
              onClick={() => handleLinkClick(link)}
              className="group w-full flex items-center justify-between bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 text-white font-medium px-6 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-indigo-500/10 hover:shadow-lg"
            >
              <span className="truncate">{link.title || link.url}</span>
              <FiExternalLink
                size={16}
                className="text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0 ml-3"
              />
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-12">
          Powered by <span className="text-zinc-500 font-medium">LinkTree</span>
        </p>
      </div>
    </div>
  );
}
