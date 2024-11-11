export type Difficulty = 'easy' | 'medium' | 'hard';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Import any global styles

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


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
