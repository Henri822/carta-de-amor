
export interface RomanticReason {
  id: number;
  text: string;
  imagePrompt: string;
}

export interface ComfortMessage {
  id: number;
  message: string;
  intensity: 'calm' | 'deep' | 'safe';
}

export interface TimeCapsule {
  id: number;
  date: string; // ISO format or key like 'anniversary'
  title: string;
  content: string;
  isLocked: boolean;
}

export interface AudioScript {
  id: number;
  title: string;
  script: string;
}
