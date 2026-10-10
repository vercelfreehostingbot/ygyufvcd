import React, { useState, useEffect, useRef } from "react";
import { MYRA_AVATAR_IMAGE } from "../assets/avatar";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Smartphone,
  Shield,
  Volume2,
  Brain,
  Globe,
  Bot,
  Bell,
  Home,
  MessageSquare,
  Zap,
  Settings,
  Battery,
  Wifi,
  Signal,
  CheckCircle2,
  Lock,
  Music,
  Play,
  RotateCcw,
  Layers,
  History,
  RefreshCw,
  Edit3,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { PhoneState, ChatMessage, AutonomousMission, VoiceCommandItem } from "../types";
import { VoiceCommandHistory } from "./VoiceCommandHistory";

interface CenterHeroProps {
  phoneState: PhoneState;
  onUpdatePhoneState: (updater: (prev: PhoneState) => PhoneState) => void;
  onSendMessage: (msg: string, actionNote?: string, isVoice?: boolean) => void;
  chatMessages: ChatMessage[];
  isLoadingAi: boolean;
  onOpenToolModal: (toolName: string) => void;
  commandHistory?: VoiceCommandItem[];
  onDeleteCommandHistory?: (id: string) => void;
  onClearCommandHistory?: () => void;
  onEditCommandHistory?: (id: string, newText: string) => void;
}

export const CenterHero: React.FC<CenterHeroProps> = ({
  phoneState,
  onUpdatePhoneState,
  onSendMessage,
  chatMessages,
  isLoadingAi,
  onOpenToolModal,
  commandHistory = [],
  onDeleteCommandHistory = (_id: string) => {},
  onClearCommandHistory = () => {},
  onEditCommandHistory = (_id: string, _newText: string) => {},
}) => {
  const [inputText, setInputText] = useState("");
  const [isOrbHovered, setIsOrbHovered] = useState(false);
  const [chatSubTab, setChatSubTab] = useState<"messages" | "history">("messages");
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current && chatSubTab === "messages") {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, phoneState.currentScreen, chatSubTab]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), undefined, false);
    setInputText("");
    if (chatSubTab === "history") {
      setChatSubTab("messages");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleMic = () => {
    const nextListening = !phoneState.isListening;

    if (!nextListening) {
      onUpdatePhoneState((prev) => ({ ...prev, isListening: false }));
      return;
    }

    onUpdatePhoneState((prev) => ({
      ...prev,
      isListening: true,
      currentScreen: "chat",
    }));
    setChatSubTab("messages");

    // Check if Browser supports Web Speech API
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US"; // Accepts natural English and phonetics

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          if (speechResult) {
            onSendMessage(speechResult, undefined, true);
          }
          onUpdatePhoneState((prev) => ({ ...prev, isListening: false }));
        };

        recognition.onerror = () => {
          // Fallback simulation if speech permission not granted
          fallbackVoiceSimulation();
        };

        recognition.onend = () => {
          onUpdatePhoneState((prev) => ({ ...prev, isListening: false }));
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn("Speech recognition error:", err);
      }
    }

    fallbackVoiceSimulation();
  };

  const fallbackVoiceSimulation = () => {
    setTimeout(() => {
      onSendMessage("Hey MYRA, give me my morning briefing and check phone battery.", undefined, true);
      onUpdatePhoneState((prev) => ({ ...prev, isListening: false }));
    }, 1800);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 1800);
  };

  const handleReRunFromHistory = (text: string, isVoice?: boolean) => {
    onSendMessage(text, undefined, isVoice ?? true);
    setChatSubTab("messages");
  };

  const handleFillInput = (text: string) => {
    setInputText(text);
  };

  const quickPrompts = [
    "মায়েরা কেমন আছো?",
    "আজকের খবর কি?",
    "Play Cyberpunk Music",
    "Lock Device Now",
    "Read Latest OTP",
    "Start Morning Mission",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      {/* Upper Main Hero Section: Avatar Left + Phone Center */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 xl:gap-10 w-full max-w-5xl">
        {/* Left: MYRA AI Cyberpunk Avatar Portrait */}
        <div className="relative flex flex-col items-center justify-center group shrink-0">
          <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-red-600/70 shadow-[0_0_35px_rgba(220,38,38,0.4)] bg-zinc-950">
            {/* The generated avatar image */}
            <img
              src={MYRA_AVATAR_IMAGE}
              alt="MYRA Cyberpunk AI Assistant"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Glowing gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

            {/* Headphone glowing holographic badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-red-500/30 pointer-events-none animate-pulse"></div>

            {/* Bottom Avatar Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-lg bg-black/80 backdrop-blur-md border border-red-600/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-mono font-bold text-white tracking-widest uppercase">MYRA-CORE</span>
              </div>
              <span className="text-[10px] text-red-400 font-mono">NEURAL ONLINE</span>
            </div>
          </div>
        </div>

        {/* Center: Android Phone Mockup */}
        <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18] max-h-[640px] rounded-[36px] bg-black border-4 border-red-600/80 shadow-[0_0_45px_rgba(239,68,68,0.45)] flex flex-col overflow-hidden text-white font-sans select-none ring-2 ring-red-950">
          {/* Top Speaker & Camera Notch */}
          <div className="w-full pt-2 px-4 flex items-center justify-between text-[11px] text-zinc-400 bg-zinc-950/90 z-20 border-b border-red-950/40">
            <span className="font-mono font-semibold text-zinc-300">10:26</span>
            <div className="w-16 h-3 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Wifi className="w-3 h-3 text-red-400" />
              <Signal className="w-3 h-3 text-red-400" />
              <span className="font-mono text-[10px]">{phoneState.battery}%</span>
              <Battery className="w-3 h-3 text-red-400" />
            </div>
          </div>

          {/* Inner Phone Screen Content */}
          <div className="flex-1 flex flex-col justify-between p-3.5 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 overflow-hidden relative">
            {/* Screen Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-wide text-white font-mono">
                  Hello, Shakil
                </h3>
                <p className="text-xs text-zinc-400 font-medium">How can I assist you today?</p>
              </div>
              <button
                onClick={() => onOpenToolModal("Notifications")}
                className="w-8 h-8 rounded-full bg-zinc-900/90 border border-red-900/60 flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-500 relative transition-all cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {phoneState.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-black">
                    {phoneState.unreadNotifications}
                  </span>
                )}
              </button>
            </div>

            {/* Screen Body depending on active screen */}
            {phoneState.currentScreen === "home" && (
              <div className="flex-1 flex flex-col items-center justify-center my-2 space-y-4">
                {/* Central Glowing Animated Voice Pulse Orb */}
                <div
                  onMouseEnter={() => setIsOrbHovered(true)}
                  onMouseLeave={() => setIsOrbHovered(false)}
                  onClick={toggleMic}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer group"
                >
                  {/* Outer Pulsing Glow Rings */}
                  <div
                    className={`absolute inset-0 rounded-full bg-red-600/20 blur-xl transition-all duration-500 ${
                      phoneState.isListening || phoneState.isSpeaking ? "scale-125 bg-red-600/40 animate-pulse" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute -inset-2 rounded-full border border-red-500/40 animate-spin`}
                    style={{ animationDuration: "12s" }}
                  ></div>
                  <div
                    className={`absolute -inset-4 rounded-full border border-dashed border-red-600/30 animate-spin`}
                    style={{ animationDuration: "8s", animationDirection: "reverse" }}
                  ></div>

                  {/* Main Orb Center */}
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-tr from-red-800 via-red-600 to-rose-500 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.8)] border-2 border-red-400 transition-all duration-300 ${
                      phoneState.isListening || phoneState.isSpeaking
                        ? "scale-110 shadow-[0_0_40px_rgba(239,68,68,1)]"
                        : "group-hover:scale-105"
                    }`}
                  >
                    {phoneState.isListening ? (
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-6 bg-white rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-8 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
                      </div>
                    ) : phoneState.isSpeaking ? (
                      <Volume2 className="w-8 h-8 text-white animate-pulse" />
                    ) : (
                      <Mic className="w-8 h-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-mono font-semibold tracking-wider text-red-400 uppercase">
                    {phoneState.isListening
                      ? "Listening to voice..."
                      : phoneState.isSpeaking
                      ? "MYRA is speaking..."
                      : "Tap Orb to Speak with MYRA"}
                  </span>
                </div>

                {/* Quick Action Pills inside Phone */}
                <div className="w-full flex flex-wrap gap-1.5 justify-center px-1">
                  {quickPrompts.slice(0, 3).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSendMessage(prompt, undefined, true)}
                      className="px-2 py-1 rounded-full bg-zinc-900 border border-red-900/50 hover:border-red-500 hover:bg-red-950 text-[10px] text-zinc-300 hover:text-white transition-all cursor-pointer truncate max-w-[140px]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Recent Voice Command Quick Ticker / Shortcuts */}
                {commandHistory.length > 0 && (
                  <div className="w-full px-1 pt-1">
                    <div className="p-2 rounded-xl bg-zinc-900/90 border border-red-950/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                        <span className="flex items-center gap-1 text-red-400 font-bold">
                          <History className="w-3 h-3" />
                          <span>RECENT VOICE LOGS</span>
                        </span>
                        <button
                          onClick={() => {
                            onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "chat" }));
                            setChatSubTab("history");
                          }}
                          className="text-red-400 hover:text-red-300 flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Log ({commandHistory.length})</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        {commandHistory.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-1.5 p-1 rounded-lg bg-black/60 border border-zinc-800 text-[10px] text-zinc-300"
                          >
                            <span className="truncate flex-1 font-mono">
                              "{item.text}"
                            </span>
                            <button
                              onClick={() => handleReRunFromHistory(item.text, item.isVoice)}
                              className="px-1.5 py-0.5 rounded bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white transition-colors flex items-center gap-0.5 shrink-0 cursor-pointer font-mono font-bold text-[9px]"
                              title="Re-run voice command"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>Re-run</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {phoneState.currentScreen === "chat" && (
              <div className="flex-1 flex flex-col my-1 overflow-hidden">
                {/* Chat Top Sub-Navigation: Live Chat vs Command History Log */}
                <div className="flex items-center justify-between gap-1 px-1 pb-1.5 mb-1 border-b border-red-950/60 shrink-0">
                  <div className="flex items-center gap-1 bg-zinc-900/90 p-0.5 rounded-lg border border-red-950">
                    <button
                      onClick={() => setChatSubTab("messages")}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                        chatSubTab === "messages"
                          ? "bg-red-600 text-white font-bold shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => setChatSubTab("history")}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                        chatSubTab === "history"
                          ? "bg-red-600 text-white font-bold shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <History className="w-3 h-3" />
                      <span>History ({commandHistory.length})</span>
                    </button>
                  </div>

                  {chatSubTab === "messages" && (
                    <button
                      onClick={() => setChatSubTab("history")}
                      className="text-[9px] text-red-400 hover:text-red-300 font-mono flex items-center gap-0.5 cursor-pointer"
                      title="Review past voice commands"
                    >
                      <span>Review Voice Log</span>
                      <ChevronRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                {/* Sub-Tab 1: Live Chat Message Stream */}
                {chatSubTab === "messages" ? (
                  <div
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto space-y-2 p-1 text-xs pr-1"
                  >
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8 text-zinc-500 text-xs">
                        Send a message or voice prompt to start chatting with MYRA!
                      </div>
                    ) : (
                      chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-xl p-2 text-xs leading-relaxed relative group ${
                              msg.sender === "user"
                                ? "bg-red-700 text-white rounded-br-none shadow-[0_2px_10px_rgba(220,38,38,0.3)]"
                                : "bg-zinc-900/90 text-zinc-100 border border-red-900/50 rounded-bl-none shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                            }`}
                          >
                            {/* User Voice badge */}
                            {msg.sender === "user" && msg.isVoice && (
                              <div className="flex items-center gap-1 text-[9px] font-mono text-red-200 mb-1 opacity-90">
                                <Mic className="w-2.5 h-2.5" />
                                <span>Voice Command</span>
                              </div>
                            )}

                            <div>{msg.text}</div>

                            {msg.actionRun && (
                              <div className="mt-1 pt-1 border-t border-red-800/40 text-[10px] font-mono text-red-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Action: {msg.actionRun}</span>
                              </div>
                            )}

                            {/* User Action Controls on Message Bubble */}
                            {msg.sender === "user" && (
                              <div className="flex items-center justify-end gap-1.5 mt-1.5 pt-1 border-t border-red-600/40 text-[9px] font-mono">
                                <button
                                  onClick={() => handleReRunFromHistory(msg.text, msg.isVoice)}
                                  className="flex items-center gap-0.5 text-red-200 hover:text-white bg-red-800/60 hover:bg-red-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                  title="Re-run this command"
                                >
                                  <RefreshCw className="w-2.5 h-2.5" />
                                  <span>Re-run</span>
                                </button>
                                <button
                                  onClick={() => setInputText(msg.text)}
                                  className="flex items-center gap-0.5 text-red-200 hover:text-white bg-red-800/60 hover:bg-red-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                  title="Edit command in input field"
                                >
                                  <Edit3 className="w-2.5 h-2.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleCopyMessage(msg.id, msg.text)}
                                  className="text-red-200 hover:text-white p-0.5 rounded cursor-pointer"
                                  title="Copy text"
                                >
                                  {copiedMsgId === msg.id ? (
                                    <Check className="w-2.5 h-2.5 text-emerald-300" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] text-zinc-500 mt-0.5 px-1 font-mono">
                            {msg.timestamp}
                          </span>
                        </div>
                      ))
                    )}
                    {isLoadingAi && (
                      <div className="flex items-center gap-1.5 p-2 bg-zinc-900/80 rounded-xl border border-red-900/40 text-xs text-red-400">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        <span className="font-mono text-[11px]">MYRA Neural Thinking...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sub-Tab 2: Interactive Voice Command History Log */
                  <VoiceCommandHistory
                    history={commandHistory}
                    onReRun={handleReRunFromHistory}
                    onEditAndRun={(id, newText) => {
                      onEditCommandHistory(id, newText);
                      setChatSubTab("messages");
                    }}
                    onDelete={onDeleteCommandHistory}
                    onClearAll={onClearCommandHistory}
                    onFillInput={handleFillInput}
                  />
                )}
              </div>
            )}

            {phoneState.currentScreen === "missions" && (
              <div className="flex-1 flex flex-col my-1 space-y-2 p-1 overflow-y-auto text-xs">
                <div className="text-xs font-bold text-red-400 font-mono uppercase flex items-center justify-between">
                  <span>AUTONOMOUS MISSIONS</span>
                  <span className="text-[10px] text-emerald-400">CORE READY</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-red-900/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-200">Morning Protocol</span>
                      <span className="text-[10px] text-zinc-400">4 Steps</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Weather, traffic check, news briefing, calendar sync.
                    </p>
                    <button
                      onClick={() => onSendMessage("Execute Morning Protocol mission")}
                      className="mt-1.5 w-full py-1 bg-red-700 hover:bg-red-600 rounded text-[11px] font-bold text-white"
                    >
                      Start Mission
                    </button>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-900 border border-red-900/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-200">Deep Device Clean</span>
                      <span className="text-[10px] text-zinc-400">3 Steps</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Clear cache, scan duplicate photos, optimize RAM.
                    </p>
                    <button
                      onClick={() => onSendMessage("Run Deep Device Clean mission")}
                      className="mt-1.5 w-full py-1 bg-zinc-800 hover:bg-red-900 rounded text-[11px] font-bold text-zinc-200"
                    >
                      Start Mission
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phoneState.currentScreen === "triggers" && (
              <div className="flex-1 flex flex-col my-1 space-y-2 p-1 overflow-y-auto text-xs">
                <div className="text-xs font-bold text-red-400 font-mono uppercase">
                  ACTIVE SMART TRIGGERS
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded bg-zinc-900 border border-red-900/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-200 text-xs">Battery Save Guard</div>
                      <div className="text-[10px] text-zinc-400">Auto trigger at 20%</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-red-900/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-200 text-xs">Driving Mode Sensor</div>
                      <div className="text-[10px] text-zinc-400">Auto speak navigation</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900 border border-red-900/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-200 text-xs">OTP Auto-Shield</div>
                      <div className="text-[10px] text-zinc-400">Hide OTP on screen</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
              </div>
            )}

            {phoneState.currentScreen === "settings" && (
              <div className="flex-1 flex flex-col my-1 space-y-2 p-1 overflow-y-auto text-xs">
                <div className="text-xs font-bold text-red-400 font-mono uppercase">
                  MYRA SYSTEM SETTINGS
                </div>
                <div className="space-y-1 text-[11px] text-zinc-300">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>Voice Model</span>
                    <span className="text-red-400 font-mono">Gemini 3.7 Neural</span>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>Wake Word</span>
                    <span className="text-red-400 font-mono">"Hey MYRA"</span>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>Privacy Level</span>
                    <span className="text-emerald-400 font-mono">Strict Private</span>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>Target Platform</span>
                    <span className="text-zinc-400">All Android / Web</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Interactive Command Bar */}
            <div className="mt-1 pt-1 border-t border-red-950/60 flex items-center gap-1.5">
              <button
                onClick={() => {
                  onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "chat" }));
                  setChatSubTab((prev) => (prev === "history" ? "messages" : "history"));
                }}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  phoneState.currentScreen === "chat" && chatSubTab === "history"
                    ? "bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(220,38,38,0.6)]"
                    : "bg-zinc-900 border-red-950/80 text-zinc-400 hover:text-red-300 hover:border-red-600"
                }`}
                title="Toggle Voice Command History Log"
              >
                <History className="w-3.5 h-3.5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask MYRA anything..."
                className="flex-1 bg-zinc-900/90 border border-red-900/60 rounded-full px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Navigation Dock inside Phone */}
            <div className="pt-2 flex items-center justify-around text-zinc-500 text-[10px] border-t border-red-950/40 mt-1">
              <button
                onClick={() =>
                  onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "home" }))
                }
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneState.currentScreen === "home" ? "text-red-400 font-bold" : "hover:text-zinc-300"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() =>
                  onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "chat" }))
                }
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneState.currentScreen === "chat" ? "text-red-400 font-bold" : "hover:text-zinc-300"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
              <button
                onClick={toggleMic}
                className="flex flex-col items-center gap-0.5 cursor-pointer text-red-500 hover:text-red-400"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center -mt-2 shadow-[0_0_8px_rgba(239,68,68,0.7)]">
                  <Mic className="w-3 h-3" />
                </div>
                <span>Voice</span>
              </button>
              <button
                onClick={() =>
                  onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "missions" }))
                }
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneState.currentScreen === "missions" ? "text-red-400 font-bold" : "hover:text-zinc-300"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Missions</span>
              </button>
              <button
                onClick={() =>
                  onUpdatePhoneState((prev) => ({ ...prev, currentScreen: "settings" }))
                }
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneState.currentScreen === "settings" ? "text-red-400 font-bold" : "hover:text-zinc-300"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WORKS ON ALL ANDROID DEVICES Pill Banner */}
      <div className="mt-4 px-5 py-1.5 rounded-full bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 border border-red-600/60 shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-100 font-mono">
        <Smartphone className="w-4 h-4 text-emerald-400" />
        <span className="tracking-wider">WORKS ON ALL ANDROID DEVICES</span>
      </div>

      {/* 5 Key Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs font-mono font-bold">
        <button
          onClick={() => onOpenToolModal("Voice Assistant")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-red-900/50 hover:border-red-500 hover:bg-red-950/40 text-zinc-200 hover:text-white transition-all cursor-pointer"
        >
          <Mic className="w-3.5 h-3.5 text-red-500" />
          <span>VOICE ASSISTANT</span>
        </button>

        <button
          onClick={() => onOpenToolModal("Screen Automation")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-red-900/50 hover:border-red-500 hover:bg-red-950/40 text-zinc-200 hover:text-white transition-all cursor-pointer"
        >
          <Bot className="w-3.5 h-3.5 text-red-500" />
          <span>SCREEN AUTOMATION</span>
        </button>

        <button
          onClick={() => onOpenToolModal("AI Powered")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-red-900/50 hover:border-red-500 hover:bg-red-950/40 text-zinc-200 hover:text-white transition-all cursor-pointer"
        >
          <Brain className="w-3.5 h-3.5 text-red-500" />
          <span>AI POWERED</span>
        </button>

        <button
          onClick={() => onOpenToolModal("Privacy First")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-red-900/50 hover:border-red-500 hover:bg-red-950/40 text-zinc-200 hover:text-white transition-all cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5 text-red-500" />
          <span>PRIVACY FIRST</span>
        </button>

        <button
          onClick={() => onOpenToolModal("Multi-Language Support")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-red-900/50 hover:border-red-500 hover:bg-red-950/40 text-zinc-200 hover:text-white transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-red-500" />
          <span>MULTI-LANGUAGE SUPPORT</span>
        </button>
      </div>

      {/* Red Center Title: TRULY YOUR PERSONAL AI COMPANION */}
      <div className="mt-4 text-center">
        <h2 className="text-sm sm:text-base md:text-lg font-black tracking-widest text-red-500 uppercase font-mono drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
          TRULY YOUR PERSONAL AI COMPANION
        </h2>
      </div>
    </div>
  );
};
