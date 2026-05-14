import { Color } from "three";

/**
 * Three.js color tokens mirroring the CSS theme.
 * Keep in sync with index.css :root tokens.
 */
export const palette = {
  bg: new Color("#0b1418"),
  surface: new Color("#0f1b20"),
  emerald: new Color("#34d399"),
  emeraldDeep: new Color("#10b981"),
  emeraldGlow: new Color("#5eead4"),
  neural: new Color("#22d3ee"),
  neuralSoft: new Color("#67e8f9"),
  signal: new Color("#a5f3fc"),
  white: new Color("#f6fbfc"),
  muted: new Color("#5b6b73"),
} as const;

export const hex = {
  bg: "#0b1418",
  surface: "#0f1b20",
  emerald: "#34d399",
  emeraldDeep: "#10b981",
  emeraldGlow: "#5eead4",
  neural: "#22d3ee",
  neuralSoft: "#67e8f9",
  signal: "#a5f3fc",
} as const;
