import React from "react";
import { AUTOMATION_TRIGGERS_LIST } from "../data/myraFeatures";
import { DynamicIcon } from "./DynamicIcon";
import { Zap, Sparkles, Brain, CheckCircle2, Play } from "lucide-react";

interface AutomationTriggersBlockProps {
  onTriggerAction: (triggerName: string, actionName: string) => void;
}

export const AutomationTriggersBlock: React.FC<AutomationTriggersBlockProps> = ({ onTriggerAction }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-black/90 border border-red-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-red-600/70 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white font-bold">
        <Zap className="w-4 h-4 text-white" />
        <h2 className="text-xs sm:text-sm tracking-wider font-extrabold uppercase font-mono">
          AUTOMATION & TRIGGERS
        </h2>
      </div>

      <div className="p-2.5 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Triggers column */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold font-mono px-1">
              TRIGGERS & SENSORS
            </span>
            {AUTOMATION_TRIGGERS_LIST.map((item) => (
              <button
                key={item.id}
                onClick={() => onTriggerAction(item.trigger, item.action)}
                className="w-full text-left p-1.5 rounded-lg bg-zinc-950/80 border border-red-950/60 hover:border-red-500/80 hover:bg-red-950/30 transition-all flex items-start gap-2 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-zinc-900 border border-red-900/60 flex items-center justify-center shrink-0 text-red-400 group-hover:text-red-300 mt-0.5">
                  <DynamicIcon name={item.icon} className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-red-300 truncate">
                    {item.trigger}
                  </div>
                  <div className="text-[10px] text-zinc-400 leading-tight">
                    {item.triggerDesc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Actions column */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold font-mono px-1">
              ACTIONS
            </span>
            <button
              onClick={() => onTriggerAction("Voice Event", "Speak & Stop")}
              className="w-full text-left p-2 rounded-lg bg-zinc-950/80 border border-red-950/60 hover:border-red-500/80 hover:bg-red-950/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-red-950 border border-red-700/60 flex items-center justify-center shrink-0 text-red-400">
                <DynamicIcon name="Volume2" className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-red-300">
                  Speak & Stop
                </div>
                <div className="text-[10px] text-zinc-400">Speak and stop.</div>
              </div>
            </button>

            <button
              onClick={() => onTriggerAction("System Routine", "Run Automation")}
              className="w-full text-left p-2 rounded-lg bg-zinc-950/80 border border-red-950/60 hover:border-red-500/80 hover:bg-red-950/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-red-950 border border-red-700/60 flex items-center justify-center shrink-0 text-red-400">
                <DynamicIcon name="Bot" className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-red-300">
                  Run Automation
                </div>
                <div className="text-[10px] text-zinc-400">Run full automation task.</div>
              </div>
            </button>

            <button
              onClick={() => onTriggerAction("Wake Prompt", "Start Conversation")}
              className="w-full text-left p-2 rounded-lg bg-zinc-950/80 border border-red-950/60 hover:border-red-500/80 hover:bg-red-950/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-red-950 border border-red-700/60 flex items-center justify-center shrink-0 text-red-400">
                <DynamicIcon name="MessageCircle" className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-100 group-hover:text-red-300">
                  Start Conversation
                </div>
                <div className="text-[10px] text-zinc-400">Start live conversation.</div>
              </div>
            </button>

            <div className="p-2 rounded-lg bg-gradient-to-r from-red-950/80 to-zinc-950 border border-red-600/40 mt-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-red-400 font-mono">
                <Brain className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>HABIT LEARNING</span>
              </div>
              <p className="text-[10px] text-zinc-300 mt-0.5">
                Learns your daily habits & reminds you before you even ask!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
