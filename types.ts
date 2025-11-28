import { LucideIcon } from "lucide-react";

export interface UserProfile {
  name: string;
  university: string;
  bloodType: string;
}

export interface WeeklyPlanItem {
  day: string;
  focus: string;
  workout: string;
  meal: string;
}

export interface Vitals {
  heartRate: number;
  steps: number;
  stressLevel: number;
  sleepHours: number;
  calories: number;
  lastUpdated: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

export interface SymptomResult {
  condition: string;
  severity: 'Low' | 'Medium' | 'High';
  advice: string;
}

export interface RiskInputs {
  bmi: number;
  sleep: number;
  activity: string;
}

export interface RiskScore {
  diabetes: number;
  stress: number;
}

export interface CardItem {
  id: number;
  Icon: LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}