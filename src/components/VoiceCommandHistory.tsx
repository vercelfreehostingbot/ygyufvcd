import React, { useState } from "react";
import {
  History,
  RefreshCw,
  Edit3,
  Trash2,
  Copy,
  Check,
  Search,
  Mic,
  Play,
  X,
  Clock,
  Sparkles,
  Zap,
  Tag,
  ArrowRight
} from "lucide-react";
import { VoiceCommandItem } from "../types";

interface VoiceCommandHistoryProps {
  history: VoiceCommandItem[];
  onReRun: (text: string, isVoice?: boolean) => void;
  onEditAndRun: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onFillInput: (text: string) => void;
}

export const VoiceCommandHistory: React.FC<VoiceCommandHistoryProps> = ({
  history,
  onReRun,
  onEditAndRun,
  onDelete,
  onClearAll,
  onFillInput,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Voice Only", "Device", "Media", "Missions", "Security", "AI & OCR"];

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (selectedCategory === "All") return true;
    if (selectedCategory === "Voice Only") return item.isVoice;
    return item.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleStartEdit = (item: VoiceCommandItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveAndRun = (id: string) => {
    if (!editText.trim()) return;
    onEditAndRun(id, editText.trim());
    setEditingId(null);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden text-xs">
      {/* Header & Stats Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-red-950/60 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-red-400" />
          <span className="font-mono font-bold text-white text-[11px] uppercase tracking-wider">
            Voice Command Log
          </span>
          <span className="px-1.5 py-0.2 rounded-full bg-red-900/60 border border-red-700/60 text-[9px] font-mono text-red-200">
            {history.length}
          </span>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-0.5 cursor-pointer font-mono"
            title="Clear all command history"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-1.5 mb-2 shrink-0">
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past voice commands..."
            className="w-full bg-zinc-900/90 border border-red-950/80 rounded-lg pl-7 pr-6 py-1 text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-mono ${
                selectedCategory === cat
                  ? "bg-red-700 text-white font-bold shadow-[0_0_8px_rgba(220,38,38,0.5)] border border-red-500"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {cat === "Voice Only" ? "🎙️ Voice Only" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-zinc-500 space-y-2">
            <Mic className="w-6 h-6 text-zinc-600 animate-pulse" />
            <p className="text-[11px]">
              {searchQuery
                ? "No voice commands match your search."
                : "No voice commands recorded yet."}
            </p>
            <p className="text-[10px] text-zinc-600">
              Speak using the mic orb or select quick prompts below!
            </p>
            <div className="flex flex-wrap gap-1 justify-center pt-2 max-w-xs">
              <button
                onClick={() => onReRun("Check battery and storage", true)}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-red-900/40 text-[10px] text-red-300 hover:bg-red-950"
              >
                + Check battery & storage
              </button>
              <button
                onClick={() => onReRun("Play Cyberpunk Synthwave", true)}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-red-900/40 text-[10px] text-red-300 hover:bg-red-950"
              >
                + Play Cyberpunk Music
              </button>
            </div>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-xl bg-zinc-900/90 border border-red-950/70 hover:border-red-800/80 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.4)] group"
            >
              {editingId === item.id ? (
                /* Inline Edit Mode */
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="text-red-400 font-bold">Edit Command:</span>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveAndRun(item.id);
                    }}
                    autoFocus
                    className="w-full bg-black/80 border border-red-600 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                  />
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveAndRun(item.id)}
                      className="px-2.5 py-0.5 rounded bg-red-600 hover:bg-red-500 text-[10px] font-bold text-white flex items-center gap-1 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Save & Re-run</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Display Mode */
                <div>
                  {/* Top line badges & timestamps */}
                  <div className="flex items-center justify-between gap-1 text-[10px] mb-1">
                    <div className="flex items-center gap-1">
                      {item.isVoice ? (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-[9px] font-bold">
                          <Mic className="w-2.5 h-2.5" />
                          <span>VOICE</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono text-[9px]">
                          KEYBOARD
                        </span>
                      )}

                      {item.category && (
                        <span className="px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-300 text-[9px] font-mono">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[9px]">
                      {item.runCount > 1 && (
                        <span className="text-red-400 font-bold">
                          {item.runCount}x used
                        </span>
                      )}
                      <span>{item.timestamp}</span>
                    </div>
                  </div>

                  {/* Command text */}
                  <div
                    onClick={() => onFillInput(item.text)}
                    className="text-zinc-100 font-medium text-[11px] leading-snug cursor-pointer hover:text-red-300 transition-colors"
                    title="Click to insert into input field"
                  >
                    "{item.text}"
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-zinc-800/60">
                    <div className="flex items-center gap-1">
                      {/* Re-run Button */}
                      <button
                        onClick={() => onReRun(item.text, item.isVoice)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/20 hover:bg-red-600 border border-red-600/40 hover:border-red-500 text-red-300 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                        title="Re-run command immediately"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Re-run</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-[10px] cursor-pointer"
                        title="Edit and re-run"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(item.id, item.text)}
                        className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Copy command text"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
