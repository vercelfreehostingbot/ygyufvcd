import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CenterHero } from "./components/CenterHero";
import { FeatureCard } from "./components/FeatureCard";
import { AutomationTriggersBlock } from "./components/AutomationTriggersBlock";
import { SafetyRulesBlock } from "./components/SafetyRulesBlock";
import { ConnectorsBlock } from "./components/ConnectorsBlock";
import { AppSettingsBlock } from "./components/AppSettingsBlock";
import { MyraMoreBlock } from "./components/MyraMoreBlock";
import { ToolModal } from "./components/ToolModal";
import { Footer } from "./components/Footer";
import {
  COMMUNICATION_TOOLS,
  CALL_TOOLS,
  MEDIA_TOOLS,
  DEVICE_TOOLS,
  FILES_PHOTOS,
  SMART_GENERATIVE_TOOLS,
  MISSIONS_BLOCK,
  NOTIFICATIONS_BLOCK,
  MAPS_MY_WORLD,
  PC_CONNECT,
  SEARCH_BROWSER_APPS,
  SCREEN_AUTOMATION,
} from "./data/myraFeatures";
import { FeatureItem, PhoneState, ChatMessage, VoiceCommandItem } from "./types";
import { AndroidSpecExplorer } from "./components/AndroidSpecExplorer";
import { Sparkles, Phone, MessageSquare, Bot, Shield, Zap } from "lucide-react";

function categorizeCommand(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("battery") || lower.includes("torch") || lower.includes("lock") || lower.includes("storage") || lower.includes("clean") || lower.includes("ram") || lower.includes("flashlight")) {
    return "Device";
  }
  if (lower.includes("music") || lower.includes("play") || lower.includes("song") || lower.includes("audio") || lower.includes("synthwave") || lower.includes("volume")) {
    return "Media";
  }
  if (lower.includes("mission") || lower.includes("protocol") || lower.includes("routine") || lower.includes("morning") || lower.includes("briefing")) {
    return "Missions";
  }
  if (lower.includes("call") || lower.includes("phone") || lower.includes("message") || lower.includes("whatsapp") || lower.includes("email") || lower.includes("sms")) {
    return "Comm";
  }
  if (lower.includes("ocr") || lower.includes("photo") || lower.includes("scan") || lower.includes("extract") || lower.includes("camera") || lower.includes("ai")) {
    return "AI & OCR";
  }
  if (lower.includes("sos") || lower.includes("emergency") || lower.includes("otp") || lower.includes("safety") || lower.includes("shield") || lower.includes("guard")) {
    return "Security";
  }
  return "General";
}

export default function App() {
  const [activeView, setActiveView] = useState<"poster" | "phone_focus" | "studio" | "android_spec">("poster");
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [selectedTool, setSelectedTool] = useState<FeatureItem | null>(null);
  const [selectedToolName, setSelectedToolName] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Phone state simulation
  const [phoneState, setPhoneState] = useState<PhoneState>({
    battery: 84,
    isCharging: false,
    wifiConnected: true,
    timeString: "10:26",
    flashlightOn: false,
    deviceLocked: false,
    currentScreen: "home",
    volume: 65,
    isListening: false,
    isSpeaking: false,
    unreadNotifications: 3,
    activeMission: null,
  });

  // Chat message history
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "myra",
      text: "হ্যালো শাকিল! আমি মায়েরা (MYRA), আপনার এআই অ্যাসিস্ট্যান্ট। আপনার ডিভাইসের সমস্ত অটোমেশন, সিকিউরিটি ও ভয়েস কন্ট্রোল সক্রিয় রয়েছে। আমাকে যেকোনো প্রশ্ন করতে পারেন বা ফোনের যেকোনো কাজের নির্দেশ দিতে পারেন!",
      timestamp: "10:26 AM",
    },
  ]);

  // Voice command history log
  const [commandHistory, setCommandHistory] = useState<VoiceCommandItem[]>([
    {
      id: "cmd-1",
      text: "Check phone battery and storage health",
      timestamp: "10:15 AM",
      isVoice: true,
      category: "Device",
      runCount: 3,
      lastExecuted: "Just now",
    },
    {
      id: "cmd-2",
      text: "Play Cyberpunk Synthwave playlist",
      timestamp: "10:04 AM",
      isVoice: true,
      category: "Media",
      runCount: 5,
      lastExecuted: "20 min ago",
    },
    {
      id: "cmd-3",
      text: "Start Morning Protocol routine",
      timestamp: "08:30 AM",
      isVoice: true,
      category: "Missions",
      runCount: 12,
      lastExecuted: "2 hrs ago",
    },
    {
      id: "cmd-4",
      text: "Lock device and turn on DND mode",
      timestamp: "Yesterday",
      isVoice: false,
      category: "Security",
      runCount: 2,
      lastExecuted: "Yesterday",
    },
    {
      id: "cmd-5",
      text: "Extract text OCR from recent photo",
      timestamp: "Yesterday",
      isVoice: true,
      category: "AI & OCR",
      runCount: 4,
      lastExecuted: "Yesterday",
    },
  ]);

  // Voice synthesis helper
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      utterance.onstart = () => {
        setPhoneState((prev) => ({ ...prev, isSpeaking: true }));
      };
      utterance.onend = () => {
        setPhoneState((prev) => ({ ...prev, isSpeaking: false }));
      };
      utterance.onerror = () => {
        setPhoneState((prev) => ({ ...prev, isSpeaking: false }));
      };
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS error:", e);
    }
  };

  const handleSendMessage = async (text: string, actionNote?: string, isVoice: boolean = false) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Record or update in Voice Command History
    setCommandHistory((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.text.trim().toLowerCase() === trimmed.toLowerCase()
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        const existing = copy[existingIndex];
        copy.splice(existingIndex, 1);
        return [
          {
            ...existing,
            runCount: (existing.runCount || 1) + 1,
            timestamp: nowTime,
            lastExecuted: "Just now",
            isVoice: isVoice || existing.isVoice,
          },
          ...copy,
        ];
      } else {
        return [
          {
            id: `cmd-${Date.now()}`,
            text: trimmed,
            timestamp: nowTime,
            isVoice,
            category: categorizeCommand(trimmed),
            runCount: 1,
            lastExecuted: "Just now",
          },
          ...prev,
        ];
      }
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: nowTime,
      isVoice,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsLoadingAi(true);
    setPhoneState((prev) => ({ ...prev, currentScreen: "chat" }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          context: {
            battery: phoneState.battery,
            deviceLocked: phoneState.deviceLocked,
            volume: phoneState.volume,
          },
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || `শাকিল, আপনার "${trimmed}" কমান্ডটি সফলভাবে প্রক্রিয়া করা হয়েছে।`;

      const myraMsg: ChatMessage = {
        id: `myra-${Date.now()}`,
        sender: "myra",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionRun: actionNote,
        source: data.source,
      };

      setChatMessages((prev) => [...prev, myraMsg]);
      speakText(aiReply);
    } catch (error) {
      console.error("AI Error:", error);
      const fallbackMsg: ChatMessage = {
        id: `myra-err-${Date.now()}`,
        sender: "myra",
        text: `শাকিল, আপনার "${trimmed}" নির্দেশটি গ্রহণ করা হয়েছে। ডিভাইসের সমস্ত সেন্সর ও ব্যাকগ্রাউন্ড সার্ভিস সক্রিয় রয়েছে।`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionRun: actionNote,
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleDeleteCommandHistory = (id: string) => {
    setCommandHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCommandHistory = () => {
    setCommandHistory([]);
  };

  const handleEditCommandHistory = (id: string, newText: string) => {
    setCommandHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
    handleSendMessage(newText, undefined, true);
  };

  const handleOpenTool = (item: FeatureItem) => {
    setSelectedTool(item);
    setSelectedToolName(item.name);
    setIsModalOpen(true);
  };

  const handleOpenToolByName = (name: string) => {
    setSelectedTool(null);
    setSelectedToolName(name);
    setIsModalOpen(true);
  };

  const handleTriggerAutomation = (triggerName: string, actionName: string) => {
    handleSendMessage(`Trigger fired: [${triggerName}] -> Executing [${actionName}]`, `${triggerName} → ${actionName}`);
  };

  const handleTestSafetyRule = (ruleTitle: string) => {
    handleSendMessage(`Verify safety rule enforcement: "${ruleTitle}"`, `Safety Check: ${ruleTitle}`);
  };

  const handleSelectConnector = (name: string, desc: string) => {
    handleSendMessage(`Sync with connector "${name}" (${desc})`, `Connector: ${name}`);
  };

  const handleSelectSetting = (setting: string) => {
    handleSendMessage(`Open and adjust setting: "${setting}"`, `Setting: ${setting}`);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col items-center selection:bg-red-600 selection:text-white font-sans">
      {/* Top Header */}
      <Header
        ttsEnabled={ttsEnabled}
        onToggleTts={() => {
          if (ttsEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          setTtsEnabled(!ttsEnabled);
        }}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenQuickPrompt={(p) => handleSendMessage(p)}
      />

      {/* Main Container */}
      <main className="w-full max-w-[1440px] px-2 sm:px-4 py-4 flex-1">
        {/* VIEW 1: POSTER LAYOUT (Exact 1:1 Infographic recreation) */}
        {activeView === "poster" && (
          <div className="flex flex-col gap-6">
            {/* Top 3-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column (Span 3 on LG) */}
              <div className="lg:col-span-3 flex flex-col gap-3.5 order-2 lg:order-1">
                <FeatureCard block={COMMUNICATION_TOOLS} onSelectItem={handleOpenTool} />
                <FeatureCard block={CALL_TOOLS} onSelectItem={handleOpenTool} />
                <FeatureCard block={MEDIA_TOOLS} onSelectItem={handleOpenTool} />
                <FeatureCard block={DEVICE_TOOLS} onSelectItem={handleOpenTool} />
                <FeatureCard block={FILES_PHOTOS} onSelectItem={handleOpenTool} />
                <FeatureCard block={SMART_GENERATIVE_TOOLS} onSelectItem={handleOpenTool} />
                <AutomationTriggersBlock onTriggerAction={handleTriggerAutomation} />
              </div>

              {/* Center Column (Span 6 on LG) */}
              <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
                <CenterHero
                  phoneState={phoneState}
                  onUpdatePhoneState={setPhoneState}
                  onSendMessage={handleSendMessage}
                  chatMessages={chatMessages}
                  isLoadingAi={isLoadingAi}
                  onOpenToolModal={handleOpenToolByName}
                  commandHistory={commandHistory}
                  onDeleteCommandHistory={handleDeleteCommandHistory}
                  onClearCommandHistory={handleClearCommandHistory}
                  onEditCommandHistory={handleEditCommandHistory}
                />

                {/* Center Bottom Blocks */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <ConnectorsBlock onSelectConnector={handleSelectConnector} />
                  <SafetyRulesBlock onTestSafetyRule={handleTestSafetyRule} />
                </div>
              </div>

              {/* Right Column (Span 3 on LG) */}
              <div className="lg:col-span-3 flex flex-col gap-3.5 order-3">
                <FeatureCard block={MISSIONS_BLOCK} onSelectItem={handleOpenTool} />
                <FeatureCard block={NOTIFICATIONS_BLOCK} onSelectItem={handleOpenTool} />
                <FeatureCard block={MAPS_MY_WORLD} onSelectItem={handleOpenTool} />
                <FeatureCard block={PC_CONNECT} onSelectItem={handleOpenTool} />
                <FeatureCard block={SEARCH_BROWSER_APPS} onSelectItem={handleOpenTool} />
                <FeatureCard block={SCREEN_AUTOMATION} onSelectItem={handleOpenTool} />
                <AppSettingsBlock onSelectSetting={handleSelectSetting} />
                <MyraMoreBlock
                  onActivateMore={() =>
                    handleSendMessage("Show me everything MYRA can do beyond standard assistants!")
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PHONE FOCUS (Deep Interactive Testing) */}
        {activeView === "phone_focus" && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono tracking-wider">
                MYRA LIVE PHONE SIMULATOR
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Interact with the full neural voice assistant, trigger multi-step missions, and chat with AI in real-time.
              </p>
            </div>

            <div className="w-full max-w-md">
              <CenterHero
                phoneState={phoneState}
                onUpdatePhoneState={setPhoneState}
                onSendMessage={handleSendMessage}
                chatMessages={chatMessages}
                isLoadingAi={isLoadingAi}
                onOpenToolModal={handleOpenToolByName}
                commandHistory={commandHistory}
                onDeleteCommandHistory={handleDeleteCommandHistory}
                onClearCommandHistory={handleClearCommandHistory}
                onEditCommandHistory={handleEditCommandHistory}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: TOOLS STUDIO (Interactive Playground of all 18+ Blocks) */}
        {activeView === "studio" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono tracking-wider">
                MYRA TOOLS & AUTOMATION STUDIO
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Click any tool block below to inspect, execute, and test with live parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureCard block={COMMUNICATION_TOOLS} onSelectItem={handleOpenTool} />
              <FeatureCard block={CALL_TOOLS} onSelectItem={handleOpenTool} />
              <FeatureCard block={MEDIA_TOOLS} onSelectItem={handleOpenTool} />
              <FeatureCard block={DEVICE_TOOLS} onSelectItem={handleOpenTool} />
              <FeatureCard block={FILES_PHOTOS} onSelectItem={handleOpenTool} />
              <FeatureCard block={SMART_GENERATIVE_TOOLS} onSelectItem={handleOpenTool} />
              <FeatureCard block={MISSIONS_BLOCK} onSelectItem={handleOpenTool} />
              <FeatureCard block={NOTIFICATIONS_BLOCK} onSelectItem={handleOpenTool} />
              <FeatureCard block={MAPS_MY_WORLD} onSelectItem={handleOpenTool} />
              <FeatureCard block={PC_CONNECT} onSelectItem={handleOpenTool} />
              <FeatureCard block={SEARCH_BROWSER_APPS} onSelectItem={handleOpenTool} />
              <FeatureCard block={SCREEN_AUTOMATION} onSelectItem={handleOpenTool} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <AutomationTriggersBlock onTriggerAction={handleTriggerAutomation} />
              <ConnectorsBlock onSelectConnector={handleSelectConnector} />
              <SafetyRulesBlock onTestSafetyRule={handleTestSafetyRule} />
            </div>
          </div>
        )}

        {/* VIEW 4: ANDROID SPECIFICATION & KOTLIN CODE EXPLORER */}
        {activeView === "android_spec" && (
          <div className="space-y-6">
            <AndroidSpecExplorer />
          </div>
        )}
      </main>

      {/* Interactive Tool Modal */}
      {isModalOpen && (
        <ToolModal
          tool={selectedTool}
          toolName={selectedToolName}
          onClose={() => setIsModalOpen(false)}
          onRunOnPhone={(cmd, act) => {
            setIsModalOpen(false);
            handleSendMessage(cmd, act);
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
