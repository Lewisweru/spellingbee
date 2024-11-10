import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Trophy, 
  User, 
  LogOut,
  Volume2,
  Clock,
  Check,
  X
} from 'lucide-react';

const GameScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [gameMode, setGameMode] = useState<'practice' | 'competition' | null>(null);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startPracticeMode = () => {
    setGameMode('practice');
    // In a real app, fetch words from the database
    setCurrentWord('sophisticated');
    setTimer(30);
    setIsCorrect(null);
    setUserInput('');
  };

  const startCompetitionMode = () => {
    setGameMode('competition');
    // In a real app, handle competition logic
    setCurrentWord('extraordinary');
    setTimer(20);
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
  };

  return (
    <div className="space-y-8">
      {/* Header with user info */}
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

      {/* Game modes */}
      {!gameMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <button
            onClick={startCompetitionMode}
            className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Trophy className="h-16 w-16 text-white mb-4" />
            <h3 className="text-2xl font-bold text-white">Competition Mode</h3>
            <p className="text-white/80 mt-2 text-center">
              Compete against other players
            </p>
          </button>
        </div>
      )}

      {/* Game interface */}
      {gameMode && (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">
              {gameMode === 'practice' ? 'Practice Mode' : 'Competition Mode'}
            </h3>
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
              {isCorrect ? (
                <Check className="h-6 w-6 mr-2" />
              ) : (
                <X className="h-6 w-6 mr-2" />
              )}
              {isCorrect ? 'Correct!' : `Incorrect. The word was "${currentWord}"`}
            </div>
          )}

          <button
            onClick={() => setGameMode(null)}
            className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold"
          >
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;