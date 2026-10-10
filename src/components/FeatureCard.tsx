import React from "react";
import { FeatureBlock, FeatureItem } from "../types";
import { DynamicIcon } from "./DynamicIcon";
import { Play, Sparkles } from "lucide-react";

interface FeatureCardProps {
  block: FeatureBlock;
  onSelectItem: (item: FeatureItem) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ block, onSelectItem }) => {
  return (
    <div
      id={`block-${block.id}`}
      className="flex flex-col rounded-xl overflow-hidden bg-black/90 border border-red-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-red-600/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300 group"
    >
      {/* Header bar */}
      <div className="flex items-center gap-2.5 px-3 py-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white font-bold">
        {block.number && (
          <span className="flex items-center justify-center w-5 h-5 rounded bg-black text-red-500 font-mono text-xs font-black shrink-0 border border-red-500/40">
            {block.number}
          </span>
        )}
        {!block.number && (
          <div className="w-5 h-5 rounded bg-black/40 flex items-center justify-center shrink-0">
            <DynamicIcon name={block.iconName} className="w-3.5 h-3.5 text-white" />
          </div>
        )}
        <h2 className="text-xs sm:text-sm tracking-wider font-extrabold uppercase font-mono truncate">
          {block.title}
        </h2>
      </div>

      {/* Item list */}
      <div className="p-2 space-y-1 divide-y divide-zinc-900/60 flex-1">
        {block.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="w-full text-left flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-red-950/40 transition-colors group/item cursor-pointer"
          >
            {/* Icon box */}
            <div className="w-7 h-7 rounded-md bg-zinc-900 border border-red-900/50 flex items-center justify-center shrink-0 group-hover/item:border-red-500 group-hover/item:bg-red-950/60 transition-all text-red-400 group-hover/item:text-red-300 mt-0.5">
              <DynamicIcon name={item.icon} className="w-3.5 h-3.5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-zinc-100 group-hover/item:text-red-300 transition-colors font-sans truncate">
                  {item.name}
                </span>
                <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[10px] text-red-400 flex items-center gap-0.5 shrink-0 bg-red-950/60 px-1 py-0.5 rounded border border-red-800/40">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Run</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {block.footerNote && (
        <div className="px-3 py-1.5 bg-zinc-950 border-t border-red-950/40 text-[10px] text-zinc-400">
          {block.footerNote}
        </div>
      )}
    </div>
  );
};
