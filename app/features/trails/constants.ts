export const DIFFICULTY = {
  EASY: "easy",
  MODERATE: "moderate",
  HARD: "hard",
  EXPERT: "expert",
} as const;

export const SEASON = {
  SPRING: "spring",
  FALL: "fall",
  SUMMER: "summer",
  WINTER: "winter",
  ALL: "all",
} as const;

export const DIFFICULTY_VALUES = [
  "easy",
  "moderate",
  "hard",
  "expert",
] as const;
export const SEASON_VALUES = [
  "spring",
  "summer",
  "fall",
  "winter",
  "all",
] as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];
export type Season = (typeof SEASON)[keyof typeof SEASON];
