import React from "react";
import { CONNECTOR_TOOLS_LIST } from "../data/myraFeatures";
import { DynamicIcon } from "./DynamicIcon";
import { CloudLightning, ExternalLink } from "lucide-react";

interface ConnectorsBlockProps {
  onSelectConnector: (name: string, desc: string) => void;
}

export const ConnectorsBlock: React.FC<ConnectorsBlockProps> = ({ onSelectConnector }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-black/90 border border-red-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-red-600/70 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white font-bold">
        <CloudLightning className="w-4 h-4 text-white" />
        <h2 className="text-xs sm:text-sm tracking-wider font-extrabold uppercase font-mono">
          CONNECTOR TOOLS
        </h2>
      </div>

      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {CONNECTOR_TOOLS_LIST.map((tool, idx) => (
          <button
            key={idx}
            onClick={() => onSelectConnector(tool.name, tool.desc)}
            className="text-left flex items-start gap-2 p-1.5 rounded-lg bg-zinc-950/70 border border-red-950/50 hover:border-red-600/70 hover:bg-red-950/30 transition-all group cursor-pointer"
          >
            <div
              className="w-6 h-6 rounded bg-zinc-900 border border-red-900/40 flex items-center justify-center shrink-0 text-red-400 group-hover:text-red-300 mt-0.5"
              style={{ borderColor: `${tool.color}60` }}
            >
              <DynamicIcon name={tool.icon} className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-zinc-100 group-hover:text-red-300 truncate">
                  {tool.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] shrink-0"></span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-tight truncate">
                {tool.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
