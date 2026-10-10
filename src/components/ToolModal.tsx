import React, { useState } from "react";
import { FeatureItem } from "../types";
import { DynamicIcon } from "./DynamicIcon";
import {
  X,
  Play,
  CheckCircle2,
  AlertOctagon,
  Copy,
  Sparkles,
  Send,
  Download,
  Smartphone,
  PhoneCall,
  Search,
  Shield,
  Bot,
  Zap,
  Volume2,
  HardDrive,
  Laptop
} from "lucide-react";

interface ToolModalProps {
  tool: FeatureItem | null;
  toolName?: string;
  onClose: () => void;
  onRunOnPhone: (command: string, actionName: string) => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  toolName,
  onClose,
  onRunOnPhone,
}) => {
  const [activeTab, setActiveTab] = useState<"demo" | "params" | "code">("demo");
  const [demoInput, setDemoInput] = useState("");
  const [demoOutput, setDemoOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const title = tool?.name || toolName || "Tool Simulator";
  const desc = tool?.desc || "Autonomous AI system tool execution sandbox.";
  const icon = tool?.icon || "Sparkles";

  const handleExecuteDemo = () => {
    setIsRunning(true);
    setDemoOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      const lower = title.toLowerCase();
      let res = `Execution completed successfully for [${title}].`;

      if (lower.includes("whatsapp") || lower.includes("sms")) {
        res = `Message queued: "${demoInput || "Hey, I will reach the office in 15 minutes."}". End-to-end encryption verified. Sent via Android intent bridge.`;
      } else if (lower.includes("image") || lower.includes("generator")) {
        res = `AI Image generated with prompt "${demoInput || "Cyberpunk neon city skyline"}": Resolution 1024x1024, style Cyber-Red cinematic.`;
      } else if (lower.includes("research") || lower.includes("search")) {
        res = `Deep Research compiled for query "${demoInput || "Latest AI hardware trends 2026"}": 14 verified sources, zero hallucinations, structured executive summary created.`;
      } else if (lower.includes("ocr") || lower.includes("extract")) {
        res = `OCR Scan complete: Detected 48 words with 99.4% confidence score. Text copied to clipboard.`;
      } else if (lower.includes("sos") || lower.includes("emergency")) {
        res = `EMERGENCY SOS ARMED: GPS Coordinates (28.6139° N, 77.2090° E) packaged with distress SMS to 3 designated contacts and siren trigger.`;
      } else if (lower.includes("pc")) {
        res = `PC Link established via secure local network. Cursor synchronization latency: 4ms. Screen mirroring active.`;
      } else if (lower.includes("storage") || lower.includes("clean")) {
        res = `Storage analyzed: 4.8 GB cache files identified, 1.2 GB duplicate photos scanned. Ready to clean.`;
      } else if (lower.includes("screen") || lower.includes("automation")) {
        res = `Accessibility Service active: Screen tree parsed (64 nodes), automated gesture simulation ready with human-like motion bezier curves.`;
      }

      setDemoOutput(res);
      onRunOnPhone(`Execute ${title}: ${demoInput || "Default parameters"}`, title);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-red-600/70 shadow-[0_0_50px_rgba(220,38,38,0.4)] overflow-hidden text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-700 via-red-600 to-rose-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center text-white border border-white/20">
              <DynamicIcon name={icon} className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold tracking-wider uppercase font-mono">
                {title}
              </h3>
              <p className="text-[11px] text-zinc-200">{desc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-red-950/60 bg-zinc-900/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab("demo")}
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === "demo"
                ? "border-b-2 border-red-500 text-red-400 font-bold bg-red-950/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            LIVE TEST SIMULATOR
          </button>
          <button
            onClick={() => setActiveTab("params")}
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === "params"
                ? "border-b-2 border-red-500 text-red-400 font-bold bg-red-950/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            SECURITY & RULES
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3">
          {activeTab === "demo" && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Custom Command / Parameter:
                </label>
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder={`e.g. Run ${title} for Vikash...`}
                  className="w-full bg-zinc-900 border border-red-900/60 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecuteDemo}
                  disabled={isRunning}
                  className="flex-1 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold text-xs text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer transition-all"
                >
                  {isRunning ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>MYRA Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute with MYRA Core</span>
                    </>
                  )}
                </button>
              </div>

              {demoOutput && (
                <div className="p-3 rounded-lg bg-zinc-900/90 border border-emerald-800/60 text-xs text-emerald-300 space-y-1 animate-fade-in font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SYSTEM EXECUTION RESULT</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-200 font-sans">
                    {demoOutput}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "params" && (
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 space-y-1">
                <span className="text-red-400 font-mono font-bold text-[11px]">
                  PRIVACY & PERMISSIONS
                </span>
                <p className="text-[11px] text-zinc-400">
                  Operates under local zero-trust sandbox. No personal data or credentials leave the device without explicit on-demand authorization.
                </p>
              </div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 space-y-1">
                <span className="text-red-400 font-mono font-bold text-[11px]">
                  AUTONOMOUS GUARDRAILS
                </span>
                <p className="text-[11px] text-zinc-400">
                  Call reject guard, OTP privacy masking, and instant lock overrides are hardcoded into the kernel layer.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-zinc-950 border-t border-red-950/60 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono text-[10px]">MYRA ENGINE 3.7</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 rounded text-zinc-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
