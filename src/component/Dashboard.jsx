import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiPlus, FiTrash2, FiExternalLink, FiLink, FiActivity,
  FiMousePointer, FiLogOut, FiUser, FiEye,
} from "react-icons/fi";
import { getLinks, createLink, updateLink, deleteLink, getProfile, updateProfile } from "../services/api";
import MobilePreview from "./MobilePreview";

export default function Dashboard() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState({ fullName: "", bio: "", profileImage: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [linksRes, profileRes] = await Promise.all([getLinks(), getProfile()]);
      setLinks(linksRes.data?.links || linksRes.data || []);
      const p = profileRes.data?.profile || profileRes.data || {};
      setProfile({ fullName: p.fullName || "", bio: p.bio || "", profileImage: p.profileImage || "" });
    } catch {
      // use mock data for demo
      setLinks([
        { _id: "1", title: "My Portfolio", url: "https://example.com", isActive: true, clicks: 42 },
        { _id: "2", title: "GitHub", url: "https://github.com", isActive: true, clicks: 18 },
      ]);
      setProfile({ fullName: "John Doe", bio: "Developer & Creator", profileImage: "" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAddLink = async () => {
    const newLink = { title: "", url: "", isActive: true, clicks: 0 };
    try {
      const res = await createLink(newLink);
      setLinks((prev) => [...prev, res.data?.link || res.data]);
    } catch {
      setLinks((prev) => [...prev, { ...newLink, _id: Date.now().toString() }]);
    }
  };

  const handleLinkChange = (id, field, value) => {
    setLinks((prev) => prev.map((l) => (l._id === id ? { ...l, [field]: value } : l)));
  };

  const handleLinkBlur = async (link) => {
    try { await updateLink(link._id, link); } catch { /* silent */ }
  };

  const handleToggle = async (link) => {
    const updated = { ...link, isActive: !link.isActive };
    setLinks((prev) => prev.map((l) => (l._id === link._id ? updated : l)));
    try { await updateLink(link._id, updated); } catch { /* silent */ }
  };

  const handleDelete = async (id) => {
    setLinks((prev) => prev.filter((l) => l._id !== id));
    try { await deleteLink(id); } catch { /* silent */ }
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile(profile);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  const totalLinks = links.length;
  const activeLinks = links.filter((l) => l.isActive).length;
  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
            <FiLink className="text-white text-sm" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LinkTree</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/u/${profile.username || "preview"}`)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5"
          >
            <FiEye size={15} /> View Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto px-4 py-8 gap-8">
        {/* Left: Management Area */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={<FiLink />} label="Total Links" value={totalLinks} color="indigo" />
            <StatCard icon={<FiActivity />} label="Active Links" value={activeLinks} color="emerald" />
            <StatCard icon={<FiMousePointer />} label="Total Clicks" value={totalClicks} color="purple" />
          </div>

          {/* Link Editor */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">My Links</h2>
              <button
                onClick={handleAddLink}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
              >
                <FiPlus size={16} /> Add New Link
              </button>
            </div>

            <div className="space-y-3">
              {links.length === 0 && (
                <div className="text-center py-12 text-zinc-600">
                  <FiLink size={32} className="mx-auto mb-3 opacity-40" />
                  <p>No links yet. Add your first one!</p>
                </div>
              )}
              {links.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  onChange={handleLinkChange}
                  onBlur={handleLinkBlur}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>

          {/* Profile Settings */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FiUser className="text-indigo-400" />
              <h2 className="text-white font-bold text-lg">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest block mb-1.5">Full Name</label>
                <input
                  value={profile.fullName}
                  onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest block mb-1.5">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell the world about yourself..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest block mb-1.5">Profile Image URL</label>
                <input
                  value={profile.profileImage}
                  onChange={(e) => setProfile((p) => ({ ...p, profileImage: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                />
              </div>
              <button
                onClick={handleProfileSave}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Mobile Preview (hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-center gap-4 w-72 shrink-0">
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Live Preview</p>
          <MobilePreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-lg ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-zinc-500 text-xs font-medium">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function LinkCard({ link, onChange, onBlur, onToggle, onDelete }) {
  return (
    <div className="group bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <input
            value={link.title}
            onChange={(e) => onChange(link._id, "title", e.target.value)}
            onBlur={() => onBlur(link)}
            placeholder="Link Title"
            className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
          />
          <div className="flex items-center gap-2">
            <input
              value={link.url}
              onChange={(e) => onChange(link._id, "url", e.target.value)}
              onBlur={() => onBlur(link)}
              placeholder="https://your-url.com"
              className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            />
            {link.url && (
              <a href={link.url} target="_blank" rel="noreferrer"
                className="text-zinc-500 hover:text-indigo-400 transition-colors p-2">
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* Toggle */}
          <button
            onClick={() => onToggle(link)}
            className={`relative w-10 h-5 rounded-full transition-all ${link.isActive ? "bg-indigo-600" : "bg-white/10"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${link.isActive ? "left-5" : "left-0.5"}`} />
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete(link._id)}
            className="text-zinc-600 hover:text-red-400 transition-colors p-1"
          >
            <FiTrash2 size={15} />
          </button>
          {/* Click count */}
          <span className="text-xs text-zinc-600 bg-white/5 px-2 py-0.5 rounded-full">
            {link.clicks || 0} clicks
          </span>
        </div>
      </div>
    </div>
  );
}
