import React from "react";

export default function MobilePreview({ profile, links }) {
  const activeLinks = links.filter((l) => l.isActive);

  return (
    <div className="relative w-64 h-[520px] bg-[#0a0a0a] rounded-[3rem] border-4 border-white/10 shadow-2xl overflow-hidden flex flex-col">
      {/* Phone notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

      {/* Screen content */}
      <div className="flex-1 overflow-y-auto pt-10 pb-4 px-4 scrollbar-hide">
        {/* Profile */}
        <div className="flex flex-col items-center text-center mt-4 mb-5">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50 mb-3"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-600/30 border-2 border-indigo-500/50 mb-3 flex items-center justify-center text-indigo-300 text-xl font-bold">
              {profile.fullName?.[0] || "?"}
            </div>
          )}
          <p className="text-white font-bold text-sm">{profile.fullName || "Your Name"}</p>
          <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{profile.bio || "Your bio here"}</p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          {activeLinks.length === 0 && (
            <p className="text-zinc-700 text-xs text-center py-4">No active links</p>
          )}
          {activeLinks.map((link) => (
            <div
              key={link._id}
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-3 py-2.5 text-white text-xs font-medium text-center truncate hover:bg-white/10 transition-colors cursor-pointer"
            >
              {link.title || link.url || "Untitled"}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-1 w-24 bg-white/20 rounded-full mx-auto mb-3" />
    </div>
  );
}
