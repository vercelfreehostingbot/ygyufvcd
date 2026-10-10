import React from "react";
import { Shield, Lock, Zap, Brain, Smartphone, Flame, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-10 border-t border-red-900/40 bg-black py-6 px-4 flex flex-col items-center justify-center space-y-4 text-center">
      {/* 5 Security Badges Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono font-black text-red-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/60 border border-red-900/60">
          <Shield className="w-3.5 h-3.5 text-red-400" />
          <span>PRIVATE</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/60 border border-red-900/60">
          <Lock className="w-3.5 h-3.5 text-red-400" />
          <span>SECURE</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/60 border border-red-900/60">
          <Zap className="w-3.5 h-3.5 text-red-400" />
          <span>POWERFUL</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/60 border border-red-900/60">
          <Brain className="w-3.5 h-3.5 text-red-400" />
          <span>SMART</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/60 border border-red-900/60">
          <Smartphone className="w-3.5 h-3.5 text-red-400" />
          <span>ALWAYS WITH YOU</span>
        </div>
      </div>

      {/* Brand signature */}
      <div className="pt-2 flex flex-col items-center space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.8)]">
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-mono uppercase">
            MYRA
          </span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-red-500 font-mono tracking-wider uppercase">
          INTELLIGENCE THAT UNDERSTANDS. COMPANION THAT CARES.
        </p>
      </div>

      <p className="text-[11px] text-zinc-600 max-w-xl">
        Next-Generation Cybernetic AI Assistant Platform • Engineered for multi-modal Android autonomy, real-time voice synthesis, privacy guardrails, and deep device integrations.
      </p>
    </footer>
  );
};
