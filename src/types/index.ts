export type Difficulty = 'easy' | 'medium' | 'hard';

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Word {
  id: string;
  word: string;
  difficulty: Difficulty;
  category: string;
  definition?: string;
  example?: string;
}

export interface WordList {
  id: string;
  name: string;
  userId: string;
  words: string[];
  createdAt: string;
}

export interface GameStats {
  userId: string;
  correctWords: number;
  totalAttempts: number;
  averageTime: number;
  lastPlayed: string;
}

export interface Competition {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  participants: string[];
  wordListId: string;
  scores: Record<string, number>;
}