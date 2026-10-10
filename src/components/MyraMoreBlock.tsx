import React from "react";
import { Sparkles, Eye, Brain, Flame, Activity } from "lucide-react";

export const MyraMoreBlock: React.FC<{ onActivateMore?: () => void }> = ({ onActivateMore }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl overflow-hidden bg-gradient-to-r from-red-950/90 via-black to-red-950/80 border border-red-600/50 shadow-[0_0_25px_rgba(220,38,38,0.25)] relative group">
      {/* Background neon ambient */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5 text-red-400">
          <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>MYRA IS MORE THAN AN ASSISTANT!</span>
        </h3>

        <div className="space-y-0.5 text-xs text-zinc-200">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">✦</span>
            <span className="font-semibold text-zinc-100">Voice + Vision + Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">✦</span>
            <span className="text-zinc-300">Understands. Learns. Acts.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">✦</span>
            <span className="text-zinc-300">Built for India, For You.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">✦</span>
            <span className="text-zinc-300">Smarter Every Day!</span>
          </div>
        </div>
      </div>

      {/* Glowing vortex orb graphic */}
      <div
        onClick={onActivateMore}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-2 border-red-500/80 flex items-center justify-center relative shadow-[0_0_20px_rgba(239,68,68,0.6)] cursor-pointer group-hover:scale-105 transition-transform shrink-0"
      >
        <div className="absolute inset-1 rounded-full border border-red-500/40 animate-spin" style={{ animationDuration: "8s" }}></div>
        <div className="absolute inset-2.5 rounded-full border border-dashed border-red-400/60 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }}></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-700 via-red-500 to-rose-400 animate-pulse flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.9)]">
          <Brain className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};
