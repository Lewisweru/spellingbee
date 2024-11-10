import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { wordList } from '../utils/wordList';
import { BookOpen, Trophy, User, LogOut, Volume2, Clock, Check, X } from 'lucide-react';

const GameScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [gameMode, setGameMode] = useState<'practice' | 'competition' | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Function to get a random word based on difficulty
const getRandomWord = () => {
    const words = wordList[difficulty];
    setCurrentWord(words[currentWordIndex]);
};

  const startPracticeMode = () => {
    setGameMode('practice');
    getRandomWord();
    setTimer(30);
    setIsCorrect(null);
    setUserInput('');
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    window.speechSynthesis.speak(utterance);
  };

  const checkSpelling = () => {
    const correct = userInput.toLowerCase() === currentWord.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
        // Move to the next word if there are more words
        if (currentWordIndex < wordList[difficulty].length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrentWord(wordList[difficulty][currentWordIndex]);
            setUserInput(''); // Clear the user input field
            setIsCorrect(null); // Reset the correctness state
        } else {
            // Handle the end of the word list, e.g., show a completion message
            alert('You\'ve finished the word list!');
        }
    }
    getRandomWord();
};

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.username}</h2>
            <p className="text-white/80">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 rounded-lg bg-red-500/10 text-red-200 hover:bg-red-500/20"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>

      {/* Difficulty Selection */}
      {!gameMode && (
        <div className="flex flex-col items-center space-y-4">
  <label className="text-lg font-semibold text-white mb-2">Select Difficulty:</label>
  <div className="relative w-64">
    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
      className="block w-full p-4 rounded-lg bg-indigo-700/20 text-white text-lg font-semibold appearance-none border border-white/20 hover:bg-indigo-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    >
      <option value="easy" className="text-black">🟢 Easy</option>
      <option value="medium" className="text-black">🟠 Medium</option>
      <option value="hard" className="text-black">🔴 Hard</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
           <button
            onClick={startPracticeMode}
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            <BookOpen className="h-16 w-16 text-white mb-4" />
            <h3 className="text-2xl font-bold text-white">Practice Mode</h3>
            <p className="text-white/80 mt-2 text-center">
              Practice spelling at your own pace
            </p>
          </button>
</div>
   )}

      {/* Game Interface */}
      {gameMode === 'practice' && (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">Practice Mode</h3>
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-5 w-5" />
              <span>{timer}s</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={speakWord}
              className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <Volume2 className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your spelling here..."
              className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={checkSpelling}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            >
              Check Spelling
            </button>
          </div>

          {isCorrect !== null && (
            <div className={`flex items-center justify-center p-4 rounded-lg ${
              isCorrect ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'
            }`}>
              {isCorrect ? <Check className="h-6 w-6 mr-2" /> : <X className="h-6 w-6 mr-2" />}
              {isCorrect ? 'Correct!' : `Incorrect. The word was "${currentWord}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
