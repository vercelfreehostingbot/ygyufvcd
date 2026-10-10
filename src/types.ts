export interface FeatureItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
  badge?: string;
  actionText?: string;
  interactiveType?:
    | "communication"
    | "call"
    | "media"
    | "device"
    | "files"
    | "ai"
    | "connectors"
    | "triggers"
    | "safety"
    | "missions"
    | "notifications"
    | "maps"
    | "pc"
    | "browser"
    | "automation";
}

export interface FeatureBlock {
  id: string;
  number?: string | number;
  iconName: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  items: FeatureItem[];
  footerNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "myra";
  text: string;
  timestamp: string;
  actionRun?: string;
  source?: "gemini" | "simulation";
  isVoice?: boolean;
}

export interface VoiceCommandItem {
  id: string;
  text: string;
  timestamp: string;
  isVoice?: boolean;
  category?: string;
  runCount: number;
  lastExecuted?: string;
}

export interface AutomationRule {
  id: string;
  triggerName: string;
  triggerDesc: string;
  actionName: string;
  actionDesc: string;
  enabled: boolean;
  icon: string;
}

export interface MissionStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  log: string;
}

export interface AutonomousMission {
  id: string;
  title: string;
  desc: string;
  steps: MissionStep[];
  status: "idle" | "running" | "completed" | "paused";
}

export interface PhoneState {
  battery: number;
  isCharging: boolean;
  wifiConnected: boolean;
  timeString: string;
  flashlightOn: boolean;
  deviceLocked: boolean;
  currentScreen: "home" | "chat" | "triggers" | "missions" | "settings" | "media" | "pc";
  volume: number;
  isListening: boolean;
  isSpeaking: boolean;
  unreadNotifications: number;
  activeMission: AutonomousMission | null;
}
