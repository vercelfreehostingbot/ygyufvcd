import React from "react";
import { Brain, Shield, Zap, Lock, Volume2, VolumeX, Sparkles, Smartphone, Grid, Code } from "lucide-react";

interface HeaderProps {
  ttsEnabled: boolean;
  onToggleTts: () => void;
  activeView: "poster" | "phone_focus" | "studio" | "android_spec";
  onSelectView: (view: "poster" | "phone_focus" | "studio" | "android_spec") => void;
  onOpenQuickPrompt: (prompt: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  ttsEnabled,
  onToggleTts,
  activeView,
  onSelectView,
  onOpenQuickPrompt,
}) => {
  return (
    <header className="w-full pt-4 pb-2 px-4 flex flex-col items-center justify-center border-b border-red-950/40 bg-gradient-to-b from-black via-zinc-950 to-black sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* Top quick utility toolbar */}
      <div className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs mb-2 pb-2 border-b border-red-900/20">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-950/80 border border-red-600/40 text-red-400 font-mono text-[11px] animate-pulse">
            ● SYSTEM ACTIVE • V3.7 NEURAL CORE
          </span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden sm:inline text-zinc-400">Personal AI Companion & Autonomous Assistant</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio voice response toggle */}
          <button
            onClick={onToggleTts}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              ttsEnabled
                ? "bg-red-950/90 text-red-300 border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-zinc-200"
            }`}
            title="Toggle Voice Speech Output"
          >
            {ttsEnabled ? <Volume2 className="w-3.5 h-3.5 text-red-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Voice Speech: {ttsEnabled ? "ON" : "MUTED"}</span>
          </button>

          {/* View selector mode */}
          <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-lg border border-red-900/40">
            <button
              onClick={() => onSelectView("poster")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "poster"
                  ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Poster Layout</span>
            </button>
            <button
              onClick={() => onSelectView("phone_focus")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "phone_focus"
                  ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Interactive Phone</span>
            </button>
            <button
              onClick={() => onSelectView("studio")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "studio"
                  ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Tools Studio</span>
            </button>
            <button
              onClick={() => onSelectView("android_spec")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "android_spec"
                  ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Android Code & Spec</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Poster Title Section */}
      <div className="text-center my-1 select-none">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)] font-mono">
          MYRA
        </h1>
        <div className="text-red-500 font-extrabold tracking-[0.3em] text-sm sm:text-base md:text-lg -mt-1 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]">
          AI ASSISTANT
        </div>
        <p className="text-zinc-300 text-xs sm:text-sm font-semibold tracking-wider mt-1 uppercase">
          YOUR AI COMPANION, YOUR PERSONAL ASSISTANT.
        </p>

        {/* 4 Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1.5 text-zinc-200 hover:text-red-400 transition-colors">
            <Brain className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Smart</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-200 hover:text-red-400 transition-colors">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Private</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-200 hover:text-red-400 transition-colors">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Powerful</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-200 hover:text-red-400 transition-colors">
            <Lock className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Secure</span>
          </div>
        </div>
      </div>
    </header>
  );
};
