import React from "react";
import { SAFETY_RULES_LIST } from "../data/myraFeatures";
import { DynamicIcon } from "./DynamicIcon";
import { Shield, Check, Lock, AlertTriangle } from "lucide-react";

interface SafetyRulesBlockProps {
  onTestSafetyRule: (ruleTitle: string) => void;
}

export const SafetyRulesBlock: React.FC<SafetyRulesBlockProps> = ({ onTestSafetyRule }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-black/90 border border-red-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-red-600/70 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white font-bold">
        <Shield className="w-4 h-4 text-white" />
        <h2 className="text-xs sm:text-sm tracking-wider font-extrabold uppercase font-mono">
          SAFETY RULES
        </h2>
      </div>

      <div className="p-2 space-y-1 divide-y divide-zinc-900/60">
        {SAFETY_RULES_LIST.map((rule, idx) => (
          <button
            key={idx}
            onClick={() => onTestSafetyRule(rule.title)}
            className="w-full text-left flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-red-950/40 transition-colors group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                rule.active
                  ? "bg-zinc-900 border-red-800/60 text-red-400 group-hover:border-red-500 group-hover:text-red-300"
                  : "bg-zinc-950 border-zinc-800 text-zinc-600"
              }`}
            >
              <DynamicIcon name={rule.icon} className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-zinc-100 group-hover:text-red-300 transition-colors truncate">
                  {rule.title}
                </span>
                {rule.active ? (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5 shrink-0 bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-800/40">
                    <Check className="w-2.5 h-2.5" />
                    <span>ENFORCED</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono flex items-center gap-0.5 shrink-0 bg-amber-950/40 px-1 py-0.5 rounded border border-amber-800/40">
                    <span>SOON</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                {rule.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
