import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: number;
  text: string;
  priority: Priority;
  done: boolean;
}

export interface BlockedSite {
  id: number;
  url: string;
  addedAt: Date;
}

export type TimerMode = 'focus' | 'short' | 'long';

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export const SOUND_TRACKS = [
  { id: 'rain',       emoji: '🌧️', name: 'Rain',        desc: 'Gentle rainfall' },
  { id: 'lofi',       emoji: '🎧', name: 'Lo-Fi',       desc: 'Chill hip-hop beats' },
  { id: 'whitenoise', emoji: '🌊', name: 'White Noise', desc: 'Blocks distractions' },
  { id: 'forest',     emoji: '🌲', name: 'Forest',      desc: 'Nature sounds' },
  { id: 'cafe',       emoji: '☕', name: 'Café',        desc: 'Coffee shop ambiance' },
  { id: 'space',      emoji: '🚀', name: 'Space',       desc: 'Cosmic ambiance' },
] as const;

export type SoundId = typeof SOUND_TRACKS[number]['id'];