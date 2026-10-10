import React from "react";
import { SETTINGS_SCREENS_LIST } from "../data/myraFeatures";
import { Settings, Sparkles, ChevronRight } from "lucide-react";

interface AppSettingsBlockProps {
  onSelectSetting: (setting: string) => void;
}

export const AppSettingsBlock: React.FC<AppSettingsBlockProps> = ({ onSelectSetting }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-black/90 border border-red-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-red-600/70 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white font-bold">
        <Settings className="w-4 h-4 text-white" />
        <h2 className="text-xs sm:text-sm tracking-wider font-extrabold uppercase font-mono truncate">
          APP SETTINGS & SCREENS
        </h2>
      </div>

      <div className="p-2.5 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
        {SETTINGS_SCREENS_LIST.map((screen, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSetting(screen)}
            className="flex items-center justify-between text-left p-1 rounded hover:bg-red-950/40 text-zinc-300 hover:text-red-300 transition-colors group cursor-pointer"
          >
            <span className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 group-hover:bg-red-400"></span>
              <span className="text-[11px] font-medium truncate">{screen}</span>
            </span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-red-400 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
