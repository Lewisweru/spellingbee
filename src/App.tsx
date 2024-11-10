import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Brain, Trophy, BookOpen } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthScreen />;
  }

  return <GameScreen />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">SpellMaster</span>
              </div>
              <div className="flex space-x-4">
                <button className="text-white hover:bg-white/10 px-3 py-2 rounded-md flex items-center">
                  <Trophy className="h-5 w-5 mr-1" />
                  Compete
                </button>
                <button className="text-white hover:bg-white/10 px-3 py-2 rounded-md flex items-center">
                  <BookOpen className="h-5 w-5 mr-1" />
                  Practice
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppContent />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;