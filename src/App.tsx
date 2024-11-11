import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppContent />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
